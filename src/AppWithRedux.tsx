import React, {useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    changeTodolistTitleAC, createTodolistTС,
    filteredTaskAC, getTodoListTС,
    removeTodolistAC
} from "./components/store/todolists-reducer";
import {
    addTasksTС, changeTaskStatusTС, changeTaskTitleAC, getTasksTС,
    removeTasksTС, TasksStateType,
} from "./components/store/task-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./store/store";
import {TaskStatuses} from "./api/todolist-api";

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type FilterType = 'all' | 'active' | 'completed'

function AppWithRedux() {
    const todolist = useSelector<AppRootStateType, TodolistType[]>((state) => state.todolists)
    const task = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks)

    const dispatch = useAppDispatch()

    const removeTask = React.useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTasksTС(todolistId, taskId))
    }, [dispatch])

    const addTask = React.useCallback((todolistId: string, newTitle: string) => {
        dispatch(addTasksTС(todolistId, newTitle))
    }, [dispatch])

    const filteredTask = React.useCallback((todolistId: string, filter: FilterType) => {

    }, [dispatch])

    const changeTaskStatus = React.useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusTС(todolistId, taskId, status))
    }, [dispatch])

    const removeTodolist = React.useCallback((todolistId: string) => {

    }, [dispatch])

    const addTodolist = React.useCallback((title: string) => {
        dispatch(createTodolistTС(title))
    }, [dispatch])

    const changeTaskTitle = React.useCallback((todolistId: string, taskId: string, title: string) => {

    }, [dispatch])

    const changeTodolistTitle = React.useCallback((todolistId: string, title: string) => {

    }, [dispatch])

    useEffect(() => {
        dispatch(getTodoListTС)
    }, [dispatch])


    return (
        <div className="App">
            <ButtonAppBar/>

            <Container>
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
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;