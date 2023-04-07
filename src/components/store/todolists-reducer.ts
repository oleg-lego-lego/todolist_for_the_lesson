import {TodolistType} from "../../App";

export const todolistsReducer = (state: TodolistType[], action: any): TodolistType[] => {
    switch (action.type) {
        case '': {
            return state
        }
        default: {
            return state
        }
    }
}