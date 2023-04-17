import React, {Reducer, useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {ActionTodolistType, todolistsReducer} from "./components/store/todolists-reducer";
import {tasksReducer} from "./components/store/task-reducer";

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

function AppWithReducer() {
    let todolist1 = v1()
    let todolist2 = v1()

    let [todolist, dispatchTodolist] = useReducer<Reducer<TodolistType[], ActionTodolistType>>(todolistsReducer,
        [
            {id: todolist1, title: 'What to learn', filter: 'all'},
            {id: todolist2, title: 'What to buy', filter: 'all'}
        ])


    const [task, dispatchTask] = useReducer(tasksReducer, {
            [todolist1]: [
                {id: v1(), title: "HTML & CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false}
            ],
            [todolist2]: [
                {id: v1(), title: "milk", isDone: true},
                {id: v1(), title: "bread", isDone: true},
                {id: v1(), title: "rice", isDone: false}
            ]
        }
    )

    const removeTask = (todolistId: string, taskId: string) => {
        // setTask({...task, [todolistId]: task[todolistId].filter(el => el.id !== taskId)})
    }

    const addTask = (todolistId: string, newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        // setTask({...task, [todolistId]: [newTask, ...task[todolistId]]})
    }

    const filteredTask = (todolistId: string, filter: FilterType) => {
        // setTodolist(todolist.map(el => el.id === todolistId ? {...el, filter} : el))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        // setTask({...task, [todolistId]: task[todolistId].map(el => el.id === taskId ? {...el, isDone} : el)})
    }

    const removeTodolist = (todolistId: string) => {
        // setTodolist(todolist.filter(el => el.id !== todolistId))
        delete task[todolistId]
    }

    const addTodolist = (title: string) => {
        const todolistId = v1()
        const newTodolist: TodolistType = {id: todolistId, title, filter: 'all'}
        // setTodolist([newTodolist, ...todolist])
        // setTask({[todolistId]: [], ...task})
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        // setTask({...task, [todolistId]: task[todolistId].map(el => el.id === taskId ? {...el, title} : el)})
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        // setTodolist(todolist.map(el => el.id === todolistId ? {...el, title} : el))
    }


    return (
        <div className="App">
            <ButtonAppBar/>

            <Container>
                <Grid container style={{padding: '30px'}}>
                    <AddItemForm callBack={addTodolist}/>
                </Grid>

                <Grid container spacing={3}>
                    {todolist.map(t => {
                        let filtered = task[t.id]
                        if (t.filter === 'active') {
                            filtered = task[t.id].filter(f => !f.isDone)
                        }
                        if (t.filter === 'completed') {
                            filtered = task[t.id].filter(f => f.isDone)
                        }

                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}} elevation={3}>
                                    <Todolist
                                        key={t.id}
                                        todolistId={t.id}
                                        title={t.title}
                                        tasks={filtered}
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

export default AppWithReducer;
