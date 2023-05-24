import {SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from "../app/app-reducer";
import {Dispatch} from "redux";
import {authAPI, LoginParamsType, ResultCode} from "../api/todolist-api";
import {appServerAppError, appServerNetworkError} from "../utils/error-util";

const initialState = {
    isLoggedIn: false
}
export type authReducerStateType = typeof initialState

export const authReducer = (state: authReducerStateType = initialState, action: ActionsType): authReducerStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export const meTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            appServerAppError(dispatch, res.data)
        }
    } catch (e) {
        appServerNetworkError(dispatch, (e as any).message)
    }
}



export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            appServerAppError(dispatch, res.data)
        }
    } catch (e) {
        appServerNetworkError(dispatch, (e as any).message)
    }
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusACType | SetAppErrorACType