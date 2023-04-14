import {FilterType, TodolistType} from "../../App";
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
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.todolistId ? {...el, title: action.newTitle} : el)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(el => el.id === action.todolistId ? {...el, filter: action.filter} : el)
        }
        default: {
            return state
        }
    }
}

export type  ActionType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | filteredTaskACType


type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', todolistId} as const
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title} as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId, newTitle} as const
}

type filteredTaskACType = ReturnType<typeof filteredTaskAC>
export const filteredTaskAC = (todolistId: string, filter: FilterType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistId, filter} as const
}

