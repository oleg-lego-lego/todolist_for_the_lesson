import React, {ChangeEvent} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "../App";

export type TaskPropsType = {
    todolistId: string
    tasks: TaskType
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, title: string) => void
    removeTask: (taskId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.tasks.id, e.currentTarget.checked)
    }

    const changeTaskTitle = (title: string) => {
        props.changeTaskTitle(props.tasks.id, title)
    }

    const removeTask = () => {
        props.removeTask(props.tasks.id)
    }

    return (
        <li className={props.tasks.isDone ? 'isDone' : ''}>
            <Checkbox checked={props.tasks.isDone} onChange={changeTaskStatus}/>
            <EditableSpan title={props.tasks.title} callBack={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <DeleteIcon/>
            </IconButton>
        </li>
    );
});
