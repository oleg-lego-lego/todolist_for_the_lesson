import React, {useEffect} from 'react';
import {FilterType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {Task} from "./components/Task";
import {useAppDispatch} from "./store/store";
import {getTasksTС} from "./components/store/task-reducer";
import {TaskStatuses, TaskType} from "./api/todolist-api";

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    filteredTask: (todolistId: string, filter: FilterType) => void
    addTask: (todolistId: string, newTitle: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    filter: FilterType
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {
    const dispatch = useAppDispatch()

    const changeTaskStatus = React.useCallback((taskId: string, status: TaskStatuses) => {
        props.changeTaskStatus(props.todolistId, taskId, status)
    }, [props])

    const changeTaskTitle = React.useCallback((taskId: string, title: string) => {
        props.changeTaskTitle(props.todolistId, taskId, title)
    }, [props])

    const removeTask = React.useCallback((taskId: string) => {
        props.removeTask(props.todolistId, taskId)
    }, [props])

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    const AddItemFormHandler = React.useCallback((title: string) => {
        props.addTask(props.todolistId, title)
    }, [props])

    const editableSpanTodolistTitle = React.useCallback((title: string) => {
        props.changeTodolistTitle(props.todolistId, title)
    }, [props])

    let tasks = props.tasks
    if (props.filter === 'active') {
        tasks = tasks.filter(f => f.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasks = tasks.filter(f => f.status === TaskStatuses.Completed)
    }

    useEffect(() => {
        dispatch(getTasksTС(props.todolistId))
    }, [])

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
                {tasks.map((t) => {
                    return (
                        <Task
                            key={t.id}
                            todolistId={props.todolistId} tasks={t}
                            changeTaskTitle={changeTaskTitle}
                            changeTaskStatus={changeTaskStatus}
                            removeTask={removeTask}
                        />
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
});
