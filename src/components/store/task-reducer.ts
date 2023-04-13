export const taskReducer = (state: any, action: any): any => {
    switch (action.type) {
        case '': {
            return state
        }
        default: {
            return state
        }
    }
}

export type  ActionType = ''


type taskACType = ReturnType<typeof taskAC>
export const taskAC = (todolistId: string) => {
    return {type: '', todolistId} as const
}



