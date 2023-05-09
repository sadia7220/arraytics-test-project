import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Cookies from "js-cookie";
import { Paper, Box, Container, Stack } from '@mui/material';
import Layout from "../layout"
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

export default function ShowAddress() {
    const [address, setAddress] = useState([])

    const { id } = useParams()

    useEffect(() => {
        const token = Cookies.get('access_token');
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/addresses/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(({ data }) => {
            setAddress(data.data)
        })
    }, [id])

    return (
        <React.Fragment>
            <Layout>
                <Container maxWidth="sm">
                    <h2>Address Details</h2>
                    <Box display="flex" justifyContent="flex-end" >
                        <Link to="/address/list">View All Addresses</Link>
                    </Box>
                    <Stack spacing={2}>
                        <Item><b>Name:  </b>{address.name}</Item>
                        <Item><b>Phone:  </b>{address.phone}</Item>
                        <Item><b>Email:  </b>{address.email}</Item>
                        <Item><b>Website:  </b>{address.website}</Item>
                        <Item><b>Gender:  </b>{address.gender}</Item>
                        <Item><b>Age:  </b>{address.age}</Item>
                        <Item><b>Nationality:  </b>{address.nationality}</Item>
                        <Item><b>Created By:  </b>{address.created_by}</Item>
                        <Item><b>Created At:  </b>{address.created_at}</Item>
                    </Stack>
                </Container>
            </Layout>
        </React.Fragment>
    );
}