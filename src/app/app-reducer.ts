export  type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
const initialState = {
    isInitialized: false,
    status: 'idle' as RequestStatusType,
    error: null as null | string
}

export type ErrorType = typeof initialState.error
export type APPStateType = typeof initialState

export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>
export type setIsInitializedACType = ReturnType<typeof setIsInitializedAC>
type ActionType =
    | SetAppStatusACType
    | SetAppErrorACType
    | setIsInitializedACType

export const appReducer = (state: APPStateType = initialState, action: ActionType): APPStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.status}
        }
        case "APP/SET-ERROR": {
            return {...state, error: action.error}
        }
        case "APP-LOGIN-SET-INITIALIZED": {
            return {...state, isInitialized: action.value}
        }
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: ErrorType) => ({type: 'APP/SET-ERROR', error} as const)
export const setIsInitializedAC = (value: boolean) => ({type: 'APP-LOGIN-SET-INITIALIZED', value} as const)
