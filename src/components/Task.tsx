import React, {ChangeEvent} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskStatuses} from "../api/todolist-api";
import '../app/App.css';
import {TaskDomainType} from "./store/task-reducer";

export type TaskPropsType = {
    todolistId: string
    tasks: TaskDomainType
    changeTaskStatus: (taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (taskId: string, title: string) => void
    removeTask: (taskId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New

        props.changeTaskStatus(props.tasks.id, newIsDoneValue)
    }

    const changeTaskTitle = (title: string) => {
        props.changeTaskTitle(props.tasks.id, title)
    }

    const removeTask = () => {
        props.removeTask(props.tasks.id)
    }

    return (
        <li className={props.tasks.status === TaskStatuses.Completed ? 'isDone' : ''}>
            <Checkbox
                checked={props.tasks.status === TaskStatuses.Completed}
                onChange={changeTaskStatus}
                disabled={props.tasks.entityCheckBoxStatus === "loading"}
                id={props.tasks.id}
            />

            <EditableSpan title={props.tasks.title} callBack={changeTaskTitle}/>

            <IconButton
                disabled={props.tasks.entityTaskStatus === "loading"}
                onClick={removeTask}>
                <DeleteIcon/>
            </IconButton>
        </li>
    );
});
