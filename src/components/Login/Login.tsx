import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {authReducerStateType, loginTC} from "./auth-reducer";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {TextCopy} from "./textCopy/TextCopy";

type errorsType = {
    email?: string,
    password?: string,
    rememberMe?: boolean
}

export const Login = () => {
    const dispatch = useAppDispatch()

    const isLoggedIn = useSelector<AppRootStateType, authReducerStateType>(state => state.auth)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },

        validate: (values) => {
            const errors: errorsType = {};

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'Must be 3 characters or more';
            }

            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            return errors;
        },

        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })

    if (isLoggedIn.isLoggedIn) {
        return <Navigate to={'/'}/>
    }


    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl style={{width: '300px', padding: '20px 0 0'}}>
                    <span>Email: <TextCopy text={'free@samuraijs.com'}/></span>
                    <span>Password: <TextCopy text={'free'}/></span>

                    <FormGroup>
                        <TextField
                            id="email"
                            autoComplete="email"
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />

                        {formik.touched.email && formik.errors.email &&
                            <div style={{color: 'red'}}>{formik.errors.email}</div>}

                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps('password')}
                        />

                        {formik.touched.password && formik.errors.password &&
                            <div style={{color: 'red'}}>{formik.errors.password}</div>}

                        <FormControlLabel
                            label={'Remember me'}
                            control={
                                <Checkbox
                                    checked={formik.values.rememberMe}
                                    {...formik.getFieldProps('rememberMe')}
                                />
                            }
                        />

                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>

                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}

