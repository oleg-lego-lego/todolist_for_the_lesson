import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC, changeTodolistTitleAC,
    filteredTaskAC,
    removeTodolistAC
} from "./components/store/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC, changeTaskTitleAC,
    removeTaskAC,
} from "./components/store/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterType = 'all' | 'active' | 'completed'

function AppWithRedux() {
    let todolist = useSelector<AppRootStateType, TodolistType[]>((state => state.todolists))
    let task = useSelector<AppRootStateType, TasksStateType>((state => state.tasks))

    const dispatch = useDispatch()

    const removeTask = React.useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }, [dispatch])

    const addTask = React.useCallback((todolistId: string, newTitle: string) => {
        dispatch(addTaskAC(todolistId, newTitle))
    }, [dispatch])

    const filteredTask = React.useCallback((todolistId: string, filter: FilterType) => {
        dispatch(filteredTaskAC(todolistId, filter))
    }, [dispatch])

    const changeTaskStatus = React.useCallback((todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }, [dispatch])

    const removeTodolist = React.useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [dispatch])

    const addTodolist = React.useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

    const changeTaskTitle = React.useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, title))
    }, [dispatch])

    const changeTodolistTitle = React.useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
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
                            <Grid item>
                                <Paper style={{padding: '10px'}} elevation={3}>
                                    <Todolist
                                        key={t.id}
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