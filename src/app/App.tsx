import React, {useEffect} from 'react';
import './App.css';
import {CircularProgress, Container} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Menu} from '@mui/icons-material';
import LinearProgress from "@mui/material/LinearProgress";
import TodoListsList from "../TodoList/TodoListsList";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./store";
import {APPStateType, RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar /ErrorSnackbar";
import {Login} from "../Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {authReducerStateType, meTC} from "../Login/auth-reducer";

function App() {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const app = useSelector<AppRootStateType, APPStateType>((state) => state.app)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(meTC())
    }, [])

    if (!app.isInitialized) {
        return (
            <div
                style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>)
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress color={'secondary'}/>}
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodoListsList/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                </Routes>
            </Container>
            <ErrorSnackbar/>
        </div>
    )
}

export default App