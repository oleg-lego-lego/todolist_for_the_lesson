import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../app/store";
import {
    addTasksTС,
    removeTasksTС,
    TasksStateType, updateTaskTС
} from "../components/store/task-reducer";
import React, {useEffect} from "react";
import {
    changeTodolistTitleTC,
    createTodolistTС,
    filteredTaskAC, FilterType, getTodoListTС,
    removeTodolistTC, TodolistDomainType
} from "../components/store/todolists-reducer";
import {TaskStatuses} from "../api/todolist-api";
import {Grid, Paper} from "@mui/material";
import {Todolist} from "../Todolist";
import {AddItemForm} from "../components/AddItemForm";
import {Navigate} from "react-router-dom";
import {authReducerStateType} from "../Login/auth-reducer";


function TodoListsList() {
    let todolist = useSelector<AppRootStateType, TodolistDomainType[]>((state => state.todolists))
    let task = useSelector<AppRootStateType, TasksStateType>((state => state.tasks))
    const isLoggedIn = useSelector<AppRootStateType, authReducerStateType>((state) => state.auth)

    const dispatch = useAppDispatch()

    const removeTask = React.useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTasksTС(todolistId, taskId))
    }, [dispatch])

    const addTask = React.useCallback((todolistId: string, newTitle: string) => {
        dispatch(addTasksTС(todolistId, newTitle))
    }, [dispatch])

    const filteredTask = React.useCallback((todolistId: string, filter: FilterType) => {
        dispatch(filteredTaskAC(todolistId, filter))
    }, [dispatch])

    const changeTaskStatus = React.useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTС(todolistId, taskId, {status}))
    }, [dispatch])

    const removeTodolist = React.useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [dispatch])

    const addTodolist = React.useCallback((title: string) => {
        dispatch(createTodolistTС(title))
    }, [dispatch])

    const changeTaskTitle = React.useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(updateTaskTС(todolistId, taskId, {title}))
    }, [dispatch])

    const changeTodolistTitle = React.useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title))
    }, [dispatch])

    useEffect(() => {
        if (!isLoggedIn.isLoggedIn) return
        dispatch(getTodoListTС)
    }, [])


    if (!isLoggedIn.isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <Grid container style={{padding: '30px'}}>
                <AddItemForm callBack={addTodolist}/>
            </Grid>

            <Grid container spacing={3}>
                {todolist.map(t => {
                    return (
                        <Grid item key={t.id}>
                            <Paper style={{padding: '10px'}} elevation={3}>
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
        </>

    );
}

export default TodoListsList;