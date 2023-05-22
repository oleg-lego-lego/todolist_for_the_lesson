import {AddTodolistACType, GetTodoListsACType, RemoveTodolistACType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {
    ResultCode,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todoListsAPI,
    UpdateTaskModelType
} from "../../api/todolist-api";
import {AppRootStateType} from "../../app/store";
import {
    setAppErrorAC,
    SetAppErrorACType,
    setAppStatusAC,
    SetAppStatusACType
} from "../../app/app-reducer";

export type  ActionTaskType =
    RemoveTaskACType
    | AddTaskACType
    | AddTodolistACType
    | RemoveTodolistACType
    | GetTodoListsACType
    | GetTasksACType
    | SetAppStatusACType
    | SetAppErrorACType
    | UpdateTaskACType
//| SetEntityStatusTaskACType

const initialState: TasksStateType = {}
export type TasksStateType = {
    [key: string]: TaskType[]
}

export const tasksReducer = (state = initialState, action: ActionTaskType): TasksStateType => {
    switch (action.type) {
        case "GET-TASKS": {
            return {...state, [action.todolistId]: [...action.tasks, ...state[action.todolistId]]}
        }
        case "GET-TODO-LIST": {
            const copyState = {...state}
            action.todoList.forEach(f => copyState[f.id] = [])
            return copyState
        }
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(f => f.id !== action.taskId)}
        }
        // case "SET-ENTITY-STATUS-TASK": {
        //     return {
        //         ...state,
        //         [action.todolistId]: state[action.todolistId].map(t => t.id === action.tasksId ? {
        //             ...t,
        //             entityStatus: action.entityStatus
        //         } : t)
        //     }
        // }
        case "ADD-TASK": {
            return {
                ...state,
                [action.task.todoListId]: [{...action.task}, ...state[action.task.todoListId]]
            }
        }
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolist.id]: []}
        }
        case "REMOVE-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.todolistId]
            return copyState
        }
        default: {
            return state
        }
    }
}

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}

type UpdateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => {
    return {type: 'UPDATE-TASK', todolistId, taskId, model} as const
}

type GetTasksACType = ReturnType<typeof getTasksAC>
export const getTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {type: 'GET-TASKS', todolistId, tasks} as const
}

export const getTasksTС = (todolistId: string) => (dispatch: Dispatch<ActionTaskType>) => {
    dispatch(setAppStatusAC('loading'))
    todoListsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(getTasksAC(todolistId, res.data.items))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const removeTasksTС = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionTaskType>) => {
    dispatch(setAppStatusAC('loading'))
    //dispatch(setEntityStatusTaskAC(todolistId, taskId, 'loading'))
    todoListsAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(todolistId, taskId))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const addTasksTС = (todolistId: string, title: string) => (dispatch: Dispatch<ActionTaskType>) => {
    dispatch(setAppStatusAC('loading'))

    todoListsAPI.createTask(todolistId, title)
        .then((res) => {
            const task: TaskType = res.data.data.item
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(addTaskAC(task))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setAppErrorAC('error'))
                }
            }
            dispatch(setAppStatusAC('idle'))
        })
}

export const updateTaskTС = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch<ActionTaskType>, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))
        const task = getState().tasks[todolistId].find(f => f.id === taskId)
        if (task) {
            const model: UpdateTaskModelType = {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...domainModel
            }
            todoListsAPI.updateTask(todolistId, taskId, model)
                .then((res) => {
                    dispatch(updateTaskAC(todolistId, taskId, domainModel))
                    dispatch(setAppStatusAC('succeeded'))
                })
        }
    }

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}



