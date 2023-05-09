import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [password, setPassword] = useState('')

    let navigate = useNavigate()

    const register = () => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/registration`, {
            name,
            email,
            password,
            password_confirmation
        }).then(
            function (response) {
                if (response.data.response_code === 201) {
                    navigate('/')
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
            <h2>Registration Form</h2>
            <form>
                <TextField
                    type="text"
                    variant='standard'
                    color='secondary'
                    label="Name"
                    onChange={e => setName(e.target.value)}
                    value={name}
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                />
                <TextField
                    type="email"
                    variant='standard'
                    color='secondary'
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                />
                <TextField
                    type="password"
                    variant='standard'
                    color='secondary'
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    required
                    fullWidth
                    sx={{ mb: 4 }}
                />
                <TextField
                    type="password"
                    variant='standard'
                    color='secondary'
                    label="Confirm Password"
                    onChange={e => setPasswordConfirmation(e.target.value)}
                    value={password_confirmation}
                    required
                    fullWidth
                    sx={{ mb: 4 }}
                />
                <Button variant="outlined" color="secondary" size="small" type="button" onClick={register} sx={{ mb: 2 }}>Register</Button>
            </form>
            <small>Already have an account? <Link to="/">Login</Link></small>
        </Container>
    )
}

export default Register;