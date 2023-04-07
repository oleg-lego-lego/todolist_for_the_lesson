import {TodolistType} from "../../App";

export const todolistsReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(f => f.id !== action.todolistId)
        }
        default: {
            return state
        }
    }
}

export type  ActionType = removeTodolistACType


type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', todolistId} as const
}