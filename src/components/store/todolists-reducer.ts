import {TodolistType} from "../../App";
import {v1} from "uuid";

export const todolistsReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(f => f.id !== action.todolistId)
        }
        case "ADD-TODOLIST": {
            const todolistId = v1()
            const newTodolist: TodolistType = {id: todolistId, title: action.title, filter: 'all'}
            return [newTodolist, ...state]
        }
        default: {
            return state
        }
    }
}

export type  ActionType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType


type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', todolistId} as const
}

type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title} as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId, newTitle} as const
}

