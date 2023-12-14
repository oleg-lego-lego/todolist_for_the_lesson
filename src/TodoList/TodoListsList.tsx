import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../app/store";
import {addTasksThunk, removeTasksThunk, TasksStateType, updateTaskThunk} from "../components/store/task-reducer";
import React, {useEffect} from "react";
import {
    changeTodolistTitleThunk,
    createTodolistThunk,
    filteredTaskAC,
    FilterType,
    getTodoListThunk,
    removeTodolistThunk,
    TodolistDomainType
} from "../components/store/todolists-reducer";
import {TaskStatuses} from "../api/todolist-api";
import {Grid, Paper} from "@mui/material";
import {Todolist} from "../Todolist";
import {AddItemForm} from "../components/AddItemForm";
import {Navigate} from "react-router-dom";
import {authReducerStateType} from "../Login/auth-reducer";


function TodoListsList() {
    const dispatch = useAppDispatch()

    let todolist = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    let task = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, authReducerStateType>(state => state.auth)

    const removeTask = (todolistId: string, taskId: string) => {
        dispatch(removeTasksThunk(todolistId, taskId))
    }

    const addTask = (todolistId: string, newTitle: string) => {
        dispatch(addTasksThunk(todolistId, newTitle))
    }

    const filteredTask = (todolistId: string, filter: FilterType) => {
        dispatch(filteredTaskAC(todolistId, filter))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskThunk(todolistId, taskId, {status}))
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistThunk(todolistId))
    }

    const addTodolist = (title: string) => {
        dispatch(createTodolistThunk(title))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(updateTaskThunk(todolistId, taskId, {title}))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleThunk(todolistId, title))
    }

    useEffect(() => {
        if (!isLoggedIn.isLoggedIn) return

        dispatch(getTodoListThunk())
    }, [dispatch, isLoggedIn.isLoggedIn])


    if (!isLoggedIn.isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div style={{padding: '0 0 40px'}}>
            <Grid container style={{padding: '30px'}}>
                <AddItemForm callBack={addTodolist}/>
            </Grid>

            <Grid container spacing={10} style={{justifyContent: "space-around"}}>
                {todolist.map(t => {
                    return (
                        <Grid item key={t.id}>
                            <Paper style={{padding: '20px'}} elevation={3}>
                                <Todolist
                                    todolistId={t.id}
                                    title={t.title}
                                    tasks={task[t.id]}
                                    removeTask={removeTask}
                                    filteredTask={filteredTask}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    filter={t.filter}
                                    entityStatus={t.entityStatus}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    );
}

export default TodoListsList;