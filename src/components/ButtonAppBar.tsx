import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {logOutTC} from "./Login/auth-reducer";
import {AppRootStateType, useAppDispatch} from "../app/store";
import {useSelector} from "react-redux";
import LinearProgress from "@mui/material/LinearProgress";
import {RequestStatusType} from "../app/app-reducer";

export function ButtonAppBar() {
    const dispatch = useAppDispatch()

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const isDisabled = useSelector<AppRootStateType, RequestStatusType>(state => state.auth.entityLogStatus)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    const logOut = () => dispatch(logOutTC())

    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}} style={{fontSize: '3rem'}}>
                            TODOLIST
                        </Typography>

                        {isLoggedIn &&
                            <Button
                                color="success"
                                variant={'contained'}
                                onClick={logOut}
                                disabled={isDisabled === 'loading'}
                            >
                                Logout
                            </Button>
                        }
                    </Toolbar>
                </AppBar>
            </Box>

            <div style={{position: 'relative'}}>
                {status === 'loading' && (
                    <LinearProgress
                        color={'secondary'}
                        style={{position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 9999}}/>
                )}
            </div>
        </>
    );
}