import React, {Reducer, useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    ActionTodolistType, addTodolistAC, changeTodolistTitleAC,
    filteredTaskAC,
    removeTodolistAC,
    todolistsReducer
} from "./components/store/todolists-reducer";
import {
    ActionTaskType,
    addTaskAC,
    changeTaskStatusAC, changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./components/store/task-reducer";

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


    const [task, dispatchTask] = useReducer<Reducer<TasksStateType, ActionTaskType>>(tasksReducer, {
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
        dispatchTask(removeTaskAC(todolistId, taskId))
    }

    const addTask = (todolistId: string, newTitle: string) => {
        dispatchTask(addTaskAC(todolistId, newTitle))
    }

    const filteredTask = (todolistId: string, filter: FilterType) => {
        dispatchTodolist(filteredTaskAC(todolistId, filter))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatchTask(changeTaskStatusAC(todolistId, taskId, isDone))
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchTodolist(action)
        dispatchTask(action)
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchTodolist(action)
        dispatchTask(action)
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatchTask(changeTaskTitleAC(todolistId, taskId, title))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchTodolist(changeTodolistTitleAC(todolistId, title))
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
