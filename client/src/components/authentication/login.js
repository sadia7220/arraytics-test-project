import React, { useState } from "react";
import { TextField, Button, Container } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios';
import swal from 'sweetalert';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    let navigate = useNavigate()

    const login = () => {
        console.log('login')
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
            email,
            password
        },
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            }
        }).then(
            function (response) {
                if (response.data.response_code === 201) {
                    const access_token = response.data.data['access_token']
                    Cookies.set('access_token', access_token)
                    navigate('/address/list')
                } else {
                    swal("Something went wrong!", response.message, "error")
                }
            }
        )
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 422 || error.response.status === 400) {
                    var result = [];
                    for (var i in error.response.data.errors)
                        result.push(i, error.response.data.errors[i]);
                    const chars = { '[': '', '"': '', ']': '' };
                    const error_message = result[1].toString().replace(/[[']]/g, m => chars[m]);
                    swal("Something went wrong!", error_message, "error")
                } else {
                    swal("Something went wrong!", error.response.data.message, "error")
                }

            } else if (error.request) {
                swal("Something went wrong!", error.request, "error")
            }
        })
    }

    return (
        <Container maxWidth="sm">
            <form autoComplete="off">
                <h2>Login Form</h2>
                <TextField
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    required
                    variant="standard"
                    color="secondary"
                    type="email"
                    sx={{ mb: 3 }}
                    fullWidth
                    value={email}
                />
                <TextField
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                    variant="standard"
                    color="secondary"
                    type="password"
                    value={password}
                    fullWidth
                    sx={{ mb: 3 }}
                />
                <Button variant="outlined" color="secondary" size="small" onClick={login} type='button' sx={{ mb: 2 }}>Login</Button>
            </form>
            <small>Do not have an account? <Link to="/register">Register</Link></small>
        </Container>
    );
}

export default Login;