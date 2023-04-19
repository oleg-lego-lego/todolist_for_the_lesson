import React, {ChangeEvent} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "../App";

export type TaskPropsType = {
    todolistId: string
    tasks: TaskType
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    removeTask: (todolistId: string, taskId: string) => void
}

export const Task = (props: TaskPropsType) => {
    const changeTaskStatus = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistId, taskId, e.currentTarget.checked)
    }

    const changeTaskTitle = React.useCallback((taskId: string, title: string) => {
        props.changeTaskTitle(props.todolistId, taskId, title)
    }, [props])

    const removeTask = () => {
        props.removeTask(props.todolistId, props.tasks.id)
    }

    return (
        <li className={props.tasks.isDone ? 'isDone' : ''}>
            <Checkbox checked={props.tasks.isDone} onChange={(e) => changeTaskStatus(props.tasks.id, e)}/>
            <EditableSpan title={props.tasks.title} callBack={(title) => changeTaskTitle(props.tasks.id, title)}/>
            <IconButton onClick={removeTask}>
                <DeleteIcon/>
            </IconButton>
        </li>
    );
};
