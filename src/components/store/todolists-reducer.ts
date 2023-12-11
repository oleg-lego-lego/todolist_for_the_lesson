import {ResultCode, todoListsAPI, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from "../../app/app-reducer";
import {appServerAppError, appServerNetworkError} from "../../utils/error-util";
import {AxiosError} from "axios";
import {getTasksTС,} from "./task-reducer";
import {AppThunk} from "../../app/store";


export type  ActionTodolistType =
    RemoveTodolistACType
    | AddTodolistACType
    | ChangeTodolistTitleACType
    | FilteredTaskACType
    | GetTodoListsACType
    | SetAppStatusACType
    | SetEntityStatusACType
    | SetAppErrorACType
    | ClearTodoListsDataACType


const initialState: TodolistDomainType[] = []
export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}

export const todolistsReducer = (state = initialState, action: ActionTodolistType): TodolistType[] => {
    switch (action.type) {
        case "GET-TODO-LIST": {
            return action.todoList.map(el => ({...el, filter: 'all'}))
        }

        case "ADD-TODOLIST": {
            return [
                {...action.todolist, filter: 'all' as FilterType, entityStatus: 'idle' as RequestStatusType},
                ...state
            ]
        }

        case 'REMOVE-TODOLIST': {
            return state.filter(f => f.id !== action.todolistId)
        }

        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.todolistId ? {...el, title: action.newTitle} : el)
        }

        case "SET-ENTITY-STATUS": {
            return state.map(el => el.id === action.todolistId ? {...el, entityStatus: action.entityStatus} : el)
        }


        case "CHANGE-TODOLIST-FILTER": {
            return state.map(el => el.id === action.todolistId ? {...el, filter: action.filter} : el)
        }

        case "CLEAR-TODO-DATA": {
            return []
        }

        default: {
            return state
        }
    }
}


export type GetTodoListsACType = ReturnType<typeof getTodoListsAC>
export const getTodoListsAC = (todoList: TodolistType[]) => {
    return {type: 'GET-TODO-LIST', todoList} as const
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: 'ADD-TODOLIST', todolist} as const
}

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', todolistId} as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId, newTitle} as const
}

type FilteredTaskACType = ReturnType<typeof filteredTaskAC>
export const filteredTaskAC = (todolistId: string, filter: FilterType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistId, filter} as const
}

export type SetEntityStatusACType = ReturnType<typeof setEntityStatusAC>
export const setEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType) => {
    return {type: 'SET-ENTITY-STATUS', todolistId, entityStatus} as const
}

export type ClearTodoListsDataACType = ReturnType<typeof clearTodoListsDataAC>
export const clearTodoListsDataAC = () => {
    return {type: 'CLEAR-TODO-DATA'} as const
}


export const getTodoListTС = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))

    todoListsAPI.getTodoLists()
        .then((res) => {
            dispatch(getTodoListsAC(res.data));
            dispatch(setAppStatusAC('succeeded'));
            return res.data;
        })
        .then((todos: TodolistType[]) => {
            todos.forEach((t) => {
                dispatch(getTasksTС(t.id));
            });
        })
        .catch((e: AxiosError) => {
            appServerNetworkError(dispatch, e.message)
        })
};

export const createTodolistTС = (title: string) => (dispatch: Dispatch<ActionTodolistType>) => {
    dispatch(setAppStatusAC('loading'))

    todoListsAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                appServerAppError<{ item: TodolistType }>(dispatch, res.data)
            }
        })
        .catch((e: AxiosError) => {
            appServerNetworkError(dispatch, e.message)
        })
}

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionTodolistType>) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(setEntityStatusAC(todolistId, 'loading'))

        todoListsAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((e: AxiosError) => {
                appServerNetworkError(dispatch, e.message)
                setTimeout(() => dispatch(setEntityStatusAC(todolistId, 'failed')), 4000)
            })
    }
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch<ActionTodolistType>) => {
        dispatch(setAppStatusAC('loading'))

        todoListsAPI.updateTodolist(todolistId, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC(todolistId, title))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((e: AxiosError) => {
                appServerNetworkError(dispatch, e.message)
            })
    }
}

