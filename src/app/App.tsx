import React from 'react';
import './App.css';
import {Container} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Menu } from '@mui/icons-material';
import LinearProgress from "@mui/material/LinearProgress";
import TodoListsList from "../TodoList/TodoListsList";

function App() {
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
            <LinearProgress color={'secondary'}/>
            <Container fixed>
                <TodoListsList/>
            </Container>
        </div>
    )
}

export default App