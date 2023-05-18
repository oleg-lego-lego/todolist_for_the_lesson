import {AddTodolistACType, GetTodoListsACType, RemoveTodolistACType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {ResultCode, TaskStatuses, TaskType, todoListsAPI, UpdateTaskModelType} from "../../api/todolist-api";
import {AppRootStateType} from "../../app/store";
import {setAppErrorAC, SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from "../../app/app-reducer";

export type  ActionTaskType =
    RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistACType
    | RemoveTodolistACType
    | GetTodoListsACType
    | GetTasksACType
    | SetAppStatusACType
    | SetAppErrorACType

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
        case "ADD-TASK": {
            return {
                ...state,
                [action.task.todoListId]: [{...action.task}, ...state[action.task.todoListId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    status: action.status
                } : el)
            }
        }
        // case "CHANGE-TASK-TITLE": {
        //     return {
        //         ...state,
        //         [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
        //             ...el,
        //             title: action.title
        //         } : el)
        //     }
        // }
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

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, status} as const
}

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title} as const
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

export const changeTaskStatusTС = (todolistId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch<ActionTaskType>, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))
        const task = getState().tasks[todolistId].find(f => f.id === taskId)
        if (task) {
            const model: UpdateTaskModelType = {
                title: task.title,
                description: task.description,
                status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
            }
            todoListsAPI.updateTask(todolistId, taskId, model)
                .then((res) => {
                    dispatch(changeTaskStatusAC(todolistId, taskId, status))
                    dispatch(setAppStatusAC('succeeded'))
                })
        }
    }



