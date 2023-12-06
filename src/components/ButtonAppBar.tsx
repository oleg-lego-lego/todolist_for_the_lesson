import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {logOutTC} from "../Login/auth-reducer";
import {AppRootStateType, useAppDispatch} from "../app/store";
import {useSelector} from "react-redux";
import LinearProgress from "@mui/material/LinearProgress";
import {RequestStatusType} from "../app/app-reducer";
import {NavLink} from "react-router-dom";

export function ButtonAppBar() {
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    const logOut = () => dispatch(logOutTC())

    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size={'small'}
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 0}}
                        >
                            <NavLink to={'/'}>
                                <MenuIcon style={{color: 'white'}} fontSize={'large'}/>
                            </NavLink>
                        </IconButton>

                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            menu
                        </Typography>

                        {isLoggedIn &&
                            <Button
                                color="success"
                                variant={'contained'}
                                onClick={logOut}
                            >
                                Logout
                            </Button>
                        }
                    </Toolbar>
                </AppBar>
            </Box>
            {status === 'loading' && <LinearProgress color={'secondary'}/>}
        </>
    );
}