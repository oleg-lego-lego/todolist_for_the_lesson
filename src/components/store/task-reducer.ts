import {TasksStateType} from "../../App";
import {v1} from "uuid";
import {AddTodolistACType, GetTodoListsACType, RemoveTodolistACType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {TaskType, todoListsAPI} from "../../api/todolist-api";

export type  ActionTaskType =
    RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistACType
    | RemoveTodolistACType
    | GetTodoListsACType
    | GetTasksACType

const initialState: any = {}

export const tasksReducer = (state = initialState, action: ActionTaskType): TasksStateType => {
    switch (action.type) {
        case "GET-TASKS": {
            // const stateCopy = {...state}
            // stateCopy[action.todolistId] = action.tasks
            // return stateCopy
            // ...state, state[action.todolistId]: action.tasks
            //return {...state, [action.todolistId]: [...action.tasks, ]}
            return {
                ...state,
                [action.todolistId]: [...action.tasks, ...state[action.todolistId]]
            }
        }
        case "GET-TODO-LIST": {
            const copyState = {...state}
            action.todoList.forEach(f => copyState[f.id] = [])
            return copyState
        }
        // case 'REMOVE-TASK': {
        //     return {...state, [action.todolistId]: state[action.todolistId].filter(f => f.id !== action.taskId)}
        // }
        // case "ADD-TASK": {
        //     const newTask = {id: v1(), title: action.title, isDone: false}
        //     return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        // }
        // case "CHANGE-TASK-STATUS": {
        //     return {
        //         ...state,
        //         [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
        //             ...el,
        //             isDone: action.isDone
        //         } : el)
        //     }
        // }
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
            return {...state, [action.todolistId]: []}
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
export const addTaskAC = (todolistId: string, title: string) => {
    return {type: 'ADD-TASK', todolistId, title} as const
}

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, isDone} as const
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



