import React, {ChangeEvent} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskStatuses, TaskType} from "../api/todolist-api";
import '../App.css';

export type TaskPropsType = {
    todolistId: string
    tasks: TaskType
    changeTaskStatus: (taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (taskId: string, title: string) => void
    removeTask: (taskId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const status =  e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        props.changeTaskStatus(props.tasks.id, status)
    }

    const changeTaskTitle = (title: string) => {
        props.changeTaskTitle(props.tasks.id, title)
    }

    const removeTask = () => {
        props.removeTask(props.tasks.id)
    }

    return (
        <li className={props.tasks.status === TaskStatuses.Completed ? 'isDone' : ''}>
            <Checkbox checked={props.tasks.status === TaskStatuses.Completed} onChange={changeTaskStatus}/>
            <EditableSpan title={props.tasks.title} callBack={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <DeleteIcon/>
            </IconButton>
        </li>
    );
});
