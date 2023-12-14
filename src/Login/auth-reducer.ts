import {
    RequestStatusType,
    SetAppErrorACType,
    setAppStatusAC,
    SetAppStatusACType,
    setIsInitializedAC,
    SetIsInitializedACType,
} from "../app/app-reducer";
import {Dispatch} from "redux";
import {authAPI, LoginParamsType, ResultCode} from "../api/todolist-api";
import {appServerNetworkError} from "../utils/error-util";
import {clearTodoListsDataAC, ClearTodoListsDataACType} from "../components/store/todolists-reducer";
import {AxiosError} from "axios";

const initialState = {
    isLoggedIn: false,
    entityLogStatus: 'idle' as RequestStatusType,
}

export type authReducerStateType = typeof initialState

export const authReducer = (state = initialState, action: AuthActionsType): authReducerStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {
                ...state, isLoggedIn: action.value
            }

        case "SET-LOG-ENTITY-STATUS":
            return {
                ...state, entityLogStatus: action.entityLogStatus
            }

        default:
            return state
    }
}

export const setIsLoggedInAC = (value: boolean) => {
    return {type: 'login/SET-IS-LOGGED-IN', value} as const
}

export type SetEntityLogStatusACType = ReturnType<typeof setEntityLogStatusAC>
export const setEntityLogStatusAC = (entityLogStatus: RequestStatusType) => {
    return {type: 'SET-LOG-ENTITY-STATUS', entityLogStatus} as const
}


export const meTC = () => async (dispatch: Dispatch<AuthActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    setTimeout(() => dispatch(setAppStatusAC('idle')), 2000)

    await authAPI.me()
        .then((res) => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            }
        })
        .catch((e: AxiosError) => {
            appServerNetworkError(dispatch, e.message)
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true))
        })
}


export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch<AuthActionsType>) => {
    dispatch(setAppStatusAC('loading'))

    await authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            }
        })
        .catch((e: AxiosError) => {
            appServerNetworkError(dispatch, e.message)
        })
}


export const logOutTC = () => async (dispatch: Dispatch<AuthActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setEntityLogStatusAC('loading'))

    await authAPI.logOut()
        .then((res) => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(setIsLoggedInAC(false))
                setTimeout(() => dispatch(setAppStatusAC('succeeded')), 2000)
                dispatch(clearTodoListsDataAC())
            }
        })
        .catch((e: AxiosError) => {
            appServerNetworkError(dispatch, e.message)
        })
        .finally(() => {
            setTimeout(() => dispatch(setEntityLogStatusAC('idle')), 4000)
        })
}


export type AuthActionsType =
    ReturnType<typeof setIsLoggedInAC>
    | SetAppStatusACType
    | SetAppErrorACType
    | SetIsInitializedACType
    | ClearTodoListsDataACType
    | SetEntityLogStatusACType
