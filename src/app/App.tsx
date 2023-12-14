import React, {useEffect} from 'react';
import './App.css';
import {CircularProgress, Container} from "@mui/material";
import TodoListsList from "../TodoList/TodoListsList";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./store";
import {ErrorSnackbar} from "../components/ErrorSnackbar /ErrorSnackbar";
import {Login} from "../Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {meTC} from "../Login/auth-reducer";
import {ButtonAppBar} from "../components/ButtonAppBar";


function App() { 
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(meTC())
    }, [dispatch])

    if (!isInitialized) {
        return (
            <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>
        )
    }

    return (
        <>
            <ButtonAppBar/>
            <Container maxWidth={"lg"}>
                <Routes>
                    <Route path={'/'} element={<TodoListsList/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                </Routes>
            </Container>
            <ErrorSnackbar/>
        </>
    )
}

export default App