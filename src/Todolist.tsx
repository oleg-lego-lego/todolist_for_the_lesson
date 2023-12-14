import React from 'react';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {Task} from "./components/Task";
import {TaskStatuses} from "./api/todolist-api";
import {FilterType} from "./components/store/todolists-reducer";
import {RequestStatusType} from "./app/app-reducer";
import {TaskDescription} from "./components/Task/TaskDescription";
import {TaskDomainType} from "./components/store/task-reducer";

type ColorType = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskDomainType[]
    removeTask: (todolistId: string, taskId: string) => void
    filteredTask: (todolistId: string, filter: FilterType) => void
    addTask: (todolistId: string, newTitle: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    filter: FilterType
    entityStatus: RequestStatusType
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}


export const Todolist = (props: TodolistPropsType) => {
    const changeTaskStatus = (taskId: string, status: TaskStatuses) => {
        props.changeTaskStatus(props.todolistId, taskId, status)
    }

    const changeTaskTitle = (taskId: string, title: string) => {
        props.changeTaskTitle(props.todolistId, taskId, title)
    }

    const removeTask = (taskId: string) => {
        props.removeTask(props.todolistId, taskId)
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    const AddItemFormHandler = (title: string) => {
        props.addTask(props.todolistId, title)
    }

    const editableSpanTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.todolistId, title)
    }

    let tasks = props.tasks
    if (props.filter === 'active') {
        tasks = tasks.filter(f => f.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasks = tasks.filter(f => f.status === TaskStatuses.Completed)
    }

    const taskDescription = (!props.tasks.length)
        ? 'Todolist is empty. Create your first task!'
        : (!tasks.length)
            ? 'The list of tasks of the selected type is empty!'
            : ''

    const renderFilterButton = (filterValue: FilterType, color: ColorType) => {
        return (
            <Button
                style={{minWidth: '35px'}}
                variant={props.filter === filterValue ? "outlined" : "text"}
                color={color}
                onClick={() => props.filteredTask(props.todolistId, filterValue)}
            >
                {filterValue}
            </Button>
        )
    }

    return (
        <>
            <h3 className={'title__todolist'}>
                <EditableSpan title={props.title} callBack={editableSpanTodolistTitle}/>
                <IconButton disabled={props.entityStatus === 'loading'} onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>

            <AddItemForm callBack={AddItemFormHandler}/>

            <ul>
                {tasks.length
                    ? tasks.map((t) => {
                        return (
                            <Task
                                key={t.id}
                                todolistId={props.todolistId}
                                tasks={t}
                                changeTaskTitle={changeTaskTitle}
                                changeTaskStatus={changeTaskStatus}
                                removeTask={removeTask}
                            />
                        )
                    })
                    : <TaskDescription title={taskDescription}/>
                }
            </ul>

            <div className={'button__filter'}>
                {renderFilterButton('all', 'inherit')}
                {renderFilterButton('active', 'primary')}
                {renderFilterButton('completed', 'secondary')}
            </div>
        </>
    );
};
