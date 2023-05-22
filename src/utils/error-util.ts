import {Dispatch} from "redux";
import {setAppErrorAC, SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from "../app/app-reducer";
import {ResponseType} from "../api/todolist-api";

type ErrorUtilsDispatchType = SetAppStatusACType | SetAppErrorACType


export const appServerNetworkError = (dispatch: Dispatch<ErrorUtilsDispatchType>, error: string) => {
    dispatch(setAppStatusAC('failed'))
    dispatch(setAppErrorAC(error))
}

export const appServerAppError = <T>(dispatch: Dispatch<SetAppErrorACType>, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('error'))
    }
}