import {TaskType} from "../../App";

export const tasksReducer = (state: TaskType[], action: ActionType): TaskType[] => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return state
        }
        default: {
            return state
        }
    }
}

export type  ActionType = RemoveTaskACType


type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const
}



