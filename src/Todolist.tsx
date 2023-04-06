import React, {ChangeEvent} from 'react';
import {FilterType, TaskType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    filteredTask: (todolistId: string, filter: FilterType) => void
    addTask: (todolistId: string, newTitle: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterType
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
    const onChangeCheckbox = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistId, taskId, e.currentTarget.checked)
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    const AddItemFormHandler = (title: string) => {
        props.addTask(props.todolistId, title)
    }

    const editableSpanTaskTitle = (taskId: string, title: string) => {
        props.changeTaskTitle(props.todolistId, taskId, title)
    }

    const editableSpanTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.todolistId, title)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callBack={editableSpanTodolistTitle}/>
                <IconButton onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm callBack={AddItemFormHandler}/>
            <ul>
                {props.tasks.map((t) => {
                    return (
                        <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={(e) => onChangeCheckbox(t.id, e)}
                            />
                            <EditableSpan title={t.title} callBack={(title) => editableSpanTaskTitle(t.id, title)}/>
                            <IconButton onClick={() => props.removeTask(props.todolistId, t.id)}>
                                <DeleteIcon/>
                            </IconButton>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button
                    variant={props.filter === 'all' ? "outlined" : "contained"} color="secondary"
                    onClick={() => props.filteredTask(props.todolistId, 'all')}
                >All</Button>

                <Button
                    variant={props.filter === 'active' ? "outlined" : "contained"} color="success"
                    onClick={() => props.filteredTask(props.todolistId, 'active')}
                >Active</Button>

                <Button
                    variant={props.filter === 'completed' ? "outlined" : "contained"} color="error"
                    onClick={() => props.filteredTask(props.todolistId, 'completed')}
                >Completed</Button>
            </div>
        </div>
    );
};
