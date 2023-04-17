import React from 'react';
import './App.css';
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {addTodolistAC,} from "./components/store/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TodolistWithRedux} from "./TodolistWithRedux";

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

function AppWithRedux() {
    let todolist = useSelector<AppRootStateType, TodolistType[]>((state => state.todolists))
    const dispatch = useDispatch()

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
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
                        return (
                            <Grid item key={t.id}>
                                <Paper style={{padding: '10px'}} elevation={3}>
                                    <TodolistWithRedux todolist={t}/>
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
