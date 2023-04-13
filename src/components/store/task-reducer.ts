import {TasksStateType} from "../../App";

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(f => f.id !== action.taskId)}
        }
        default: {
            return state
        }
    }
}

export type  ActionType = RemoveTaskACType | AddTaskACType


type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, title: string) => {
    return {type: 'ADD-TASK', todolistId, title} as const
}



