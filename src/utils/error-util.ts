import {Dispatch} from "redux";
import {setAppErrorAC, SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from "../app/app-reducer";
import {ResponseType} from "../api/todolist-api";

type ErrorUtilsDispatchType = SetAppStatusACType | SetAppErrorACType


export const appServerNetworkError = (dispatch: Dispatch<ErrorUtilsDispatchType>, error: string) => {
    setTimeout(() => dispatch(setAppStatusAC('failed')), 4000)
    dispatch(setAppErrorAC(error))
}

export const appServerAppError = <T>(dispatch: Dispatch<ErrorUtilsDispatchType>, data: ResponseType<T>) => {
    setTimeout(() => dispatch(setAppStatusAC('failed')), 4000)

    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('error'))
    }
}