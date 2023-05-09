import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Cookies from "js-cookie";
import swal from 'sweetalert'
import { Box, TextField, Button, Container, Stack, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import Layout from "../layout"
import showErrorMessage from '../shared/errorMessage'

export default function EditAddress() {
    const [inputs, setInputs] = useState([])

    let navigate = useNavigate();
    const { id } = useParams()

    useEffect(() => {
        const token = Cookies.get('access_token');
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/addresses/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(({ data }) => {
            setInputs(data.data)
        })
    }, [id])

    const editAddress = () => {
        const token = Cookies.get('access_token');
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/addresses/${id}`, inputs, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(
            function (response) {
                if (response.data.response_code === 201) {
                    swal("Success", response.data.message, "success", {
                        buttons: false,
                        timer: 1000,
                    })
                    .then((value) => {
                        navigate('/address/list')
                    });

                } else {
                    swal("Something went wrong!", response.message, "error")
                }
            }
        )
        .catch(function (error) {
            if (error.response) {
                showErrorMessage(error.response)
            } else if (error.request) {
                swal("Something went wrong!", error.request, "error")
            }
        })
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    return (
        <React.Fragment>
            <Layout>
                <Container maxWidth="sm">
                    <h2>Edit Address</h2>
                    <Box display="flex" justifyContent="flex-end" >
                        <Link to="/address/list">View All Addresses</Link>
                    </Box>

                    <form >
                        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                            <TextField
                                type="text"
                                variant="standard"
                                color='secondary'
                                label="Name"
                                name="name"
                                onChange={handleChange}
                                value={inputs.name || ""}
                                fullWidth
                                required
                            />
                            <TextField
                                type="text"
                                variant='standard'
                                color='secondary'
                                label="Phone"
                                name="phone"
                                onChange={handleChange}
                                value={inputs.phone || ""}
                                fullWidth
                                required
                            />
                        </Stack>
                        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                            <TextField
                                type="email"
                                variant='standard'
                                color='secondary'
                                label="Email"
                                name="email"
                                onChange={handleChange}
                                value={inputs.email || ""}
                                fullWidth
                                required
                            />
                            <TextField
                                type="text"
                                variant='standard'
                                color='secondary'
                                label="Website"
                                name="website"
                                onChange={handleChange}
                                value={inputs.website || ""}
                                fullWidth
                            />
                        </Stack>
                        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                            <TextField
                                type="text"
                                variant='standard'
                                color='secondary'
                                label="Age"
                                name="age"
                                onChange={handleChange}
                                value={inputs.age || ""}
                                fullWidth
                                required
                            />
                            <TextField
                                type="text"
                                variant='standard'
                                color='secondary'
                                label="Nationality"
                                name="nationality"
                                onChange={handleChange}
                                value={inputs.nationality || ""}
                                fullWidth
                                required
                            />
                        </Stack>
                        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                            <FormControl>
                                <FormLabel id="demo-customized-radios" >Gender</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="gender"
                                    onChange={handleChange}
                                    value={inputs.gender || ""}
                                >
                                    <FormControlLabel value="female" control={<Radio size="small" required={true} />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio size="small" required={true} />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio size="small" required={true} />} label="Other" />
                                </RadioGroup>

                            </FormControl>
                        </Stack>
                        <Box display="flex" justifyContent="flex-end" >
                            <Button variant="contained" color="primary" size="small" type="button" onClick={editAddress}>Save</Button>
                        </Box>
                    </form>
                </Container>
            </Layout>
        </React.Fragment>
    );
}