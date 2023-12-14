import {
    AddTodolistACType,
    ClearTodoListsDataACType,
    GetTodoListsACType,
    RemoveTodolistACType
} from "./todolists-reducer";
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
import {RequestStatusType, SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from "../../app/app-reducer";
import {appServerAppError, appServerNetworkError} from "../../utils/error-util";
import {AxiosError} from "axios";


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
    | ClearTodoListsDataACType
    | SetEntityTaskStatusACType
    | SetEntityCheckStatusACType


export type TasksStateType = {
    [key: string]: TaskDomainType[]
}

const initialState: TasksStateType = {}

export type TaskDomainType = TaskType & {
    entityTaskStatus: RequestStatusType,
    entityCheckBoxStatus: RequestStatusType,
}

export const tasksReducer = (state = initialState, action: ActionTaskType): TasksStateType => {
    switch (action.type) {
        case "GET-TASKS": {
            const tasksWithStatus: TaskDomainType[] = action.tasks.map(task => ({
                ...task,
                entityTaskStatus: 'idle' as RequestStatusType,
                entityCheckBoxStatus: 'idle' as RequestStatusType
            }))

            return {...state, [action.todolistId]: [...tasksWithStatus, ...state[action.todolistId]]};
        }

        case "GET-TODO-LIST": {
            const copyState = {...state}
            action.todoList.forEach(f => copyState[f.id] = [])

            return copyState
        }

        case "REMOVE-TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].filter(f => f.id !== action.taskId)}
        }

        case "SET-TASK-ENTITY-STATUS": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId
                    ? {...t, entityTaskStatus: action.entityTaskStatus} : t)
            }
        }

        case "SET-CHECK-ENTITY-STATUS": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId
                    ? {...t, entityCheckBoxStatus: action.entityCheckBoxStatus} : t)
            }
        }

        case "ADD-TASK": {
            const todoListId = action.task.todoListId;

            const updatedTasks = [
                {
                    ...action.task,
                    entityTaskStatus: 'idle' as RequestStatusType,
                    entityCheckBoxStatus: 'idle' as RequestStatusType
                },
                ...state[todoListId] || []
            ];

            return {...state, [todoListId]: updatedTasks}
        }

        case "UPDATE-TASK": {
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

        case "CLEAR-TODO-DATA": {
            return {}
        }

        default: {
            return state
        }
    }
}

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const
}

export type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}

export type UpdateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => {
    return {type: 'UPDATE-TASK', todolistId, taskId, model} as const
}

export type GetTasksACType = ReturnType<typeof getTasksAC>
export const getTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {type: 'GET-TASKS', todolistId, tasks} as const
}

export type SetEntityTaskStatusACType = ReturnType<typeof setEntityTaskStatusAC>
export const setEntityTaskStatusAC = (todolistId: string, taskId: string, entityTaskStatus: RequestStatusType) => {
    return {type: 'SET-TASK-ENTITY-STATUS', todolistId, taskId, entityTaskStatus} as const
}

export type SetEntityCheckStatusACType = ReturnType<typeof setEntityCheckStatusAC>
export const setEntityCheckStatusAC = (todolistId: string, taskId: string, entityCheckBoxStatus: RequestStatusType) => {
    return {type: 'SET-CHECK-ENTITY-STATUS', todolistId, taskId, entityCheckBoxStatus} as const
}


export const getTasksThunk = (todolistId: string) => (dispatch: Dispatch<ActionTaskType>) => {
    dispatch(setAppStatusAC('loading'))

    todoListsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(getTasksAC(todolistId, res.data.items))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e: AxiosError) => {
            appServerNetworkError(dispatch, e.message)
        })
}

export const removeTasksThunk = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionTaskType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setEntityTaskStatusAC(todolistId, taskId, 'loading'))

    todoListsAPI.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(todolistId, taskId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e: AxiosError) => {
            appServerNetworkError(dispatch, e.message)
            setTimeout(
                () => dispatch(setEntityTaskStatusAC(todolistId, taskId, 'idle')
                ), 4000)
        })
}

export const addTasksThunk = (todolistId: string, title: string) => (dispatch: Dispatch<ActionTaskType>) => {
    dispatch(setAppStatusAC('loading'))

    todoListsAPI.createTask(todolistId, title)
        .then((res) => {
            const task: TaskType = res.data.data.item
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(addTaskAC(task))
            } else {
                appServerAppError<{ item: TaskType }>(dispatch, res.data)
            }
            setTimeout(() => dispatch(setAppStatusAC('idle')), 2000)
        })
        .catch((e: AxiosError) => {
            appServerNetworkError(dispatch, e.message)
        })
}

export const updateTaskThunk = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
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

            if (model.status || !model.status) {
                dispatch(setEntityCheckStatusAC(todolistId, taskId, 'loading'))
            }

            todoListsAPI.updateTask(todolistId, taskId, model)
                .then((res) => {
                    if (res.data.resultCode === ResultCode.OK) {
                        dispatch(updateTaskAC(todolistId, taskId, domainModel))
                        dispatch(setAppStatusAC('succeeded'))
                        dispatch(setEntityCheckStatusAC(todolistId, taskId, 'idle'))
                    } else {
                        appServerAppError(dispatch, res.data)
                    }
                })
                .catch(e => {
                    appServerNetworkError(dispatch, e.message)
                    setTimeout(() => dispatch(
                        setEntityCheckStatusAC(todolistId, taskId, 'idle')
                    ), 4000)
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



