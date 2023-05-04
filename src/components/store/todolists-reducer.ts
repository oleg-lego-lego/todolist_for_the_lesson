import {v1} from "uuid";
import {TodolistType} from "../../api/todolist-api";

export type  ActionTodolistType =
    RemoveTodolistACType
    | AddTodolistACType
    | ChangeTodolistTitleACType
    | filteredTaskACType
    | GetTodoListsACType


const initialState: TodolistDomainType[]  = []
type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterType
}

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionTodolistType): TodolistType[] => {
    switch (action.type) {
        case "GET-TODO-LIST": {
            return action.todoList.map(el => ({...el, filter: 'all'}))
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(f => f.id !== action.todolistId)
        }
        case "ADD-TODOLIST": {
            const newTodolist: TodolistDomainType = {id: action.todolistId, title: action.title, filter: 'all', addedDate: '', order: 0}
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

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', todolistId} as const
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()} as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId, newTitle} as const
}

type filteredTaskACType = ReturnType<typeof filteredTaskAC>
export const filteredTaskAC = (todolistId: string, filter: FilterType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistId, filter} as const
}

export type GetTodoListsACType = ReturnType<typeof getTodoListsAC>
export const getTodoListsAC = (todoList: TodolistType[]) => {
    return {type: 'GET-TODO-LIST', todoList} as const
}

