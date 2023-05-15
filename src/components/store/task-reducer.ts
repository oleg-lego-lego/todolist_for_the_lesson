import {AddTodolistACType, GetTodoListsACType, RemoveTodolistACType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {TaskStatuses, TaskType, todoListsAPI, UpdateTaskModelType} from "../../api/todolist-api";
import {v1} from "uuid";
import {AppRootStateType} from "../../store/store";

export type  ActionTaskType =
    RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistACType
    | RemoveTodolistACType
    | GetTodoListsACType
    | GetTasksACType

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
            const newTask: TaskType = {
                todoListId: action.todolistId, id: v1(), title: action.title, description: '',
                status: 0, priority: 0, startDate: '', deadline: '', order: 0, addedDate: ''
            }
            return {...state, [action.todolistId] : [newTask , ...state[action.todolistId]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {

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
            return state
        }
        case "REMOVE-TODOLIST": {
            return state
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
export const addTaskAC = (todolistId: string, title: string) => {
    return {type: 'ADD-TASK', todolistId, title} as const
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

export const getTasksTС = (todolistId: string) => (dispatch: Dispatch) => {
    todoListsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(getTasksAC(todolistId, res.data.items))
        })

}

export const removeTasksTС = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todoListsAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(todolistId, taskId))
        })

}

export const addTasksTС = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todoListsAPI.createTask(todolistId, title)
        .then((res) => {
            dispatch(addTaskAC(todolistId, title))
        })

}

export const changeTaskStatusTС = (todolistId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {

        //     todoListsAPI.updateTask(todolistId, taskId, model)
        //
        // }
    }



