import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';
import {
    TextField, Box, Button, Container, TableContainer, Paper
} from '@mui/material';
import axios from 'axios';
import Layout from "../layout"
import DataTable from "../shared/dataTable.tsx"
import swal from 'sweetalert'

export default function AddressList() {

    const [addresses, setAddresses] = useState([])
    const token = Cookies.get('access_token')

    //for search purpose
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        //address list
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/addresses`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(({ data }) => {
            setAddresses(data.data)
            setSearchQuery('')
        })
    }, [token])

    useEffect(() => {
        //search
        if (searchQuery.length > 2) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/addresses/search/${searchQuery}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(({ data }) => {
                setSearchResults(data.data)
            })
        }
    }, [searchQuery, token])

    //search
    const handleSearchInputChange = (value) => {
        setSearchQuery(value)
    }

    //delete
    const deleteAddress = async (id) => {
        swal({
            title: "Warning!",
            text: "Are you sure that you want to delete this data?",
            icon: "warning",
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/addresses/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }).then(({ response }) => {
                        swal("Deleted!", response.message, "success");
                    }).catch(({ response: { data } }) => {
                        swal("Something went wrong!", data.message, "error")
                    })
                }
            })
    }

    const columns = [
        {
            label: "S.N.",
            field: 'sn',
        },
        {
            label: "Name",
            field: 'name',
        },
        {
            label: "Phone Number",
            field: 'phone',
        },
        {
            label: "Email Address",
            field: 'email',
        },
        {
            label: "Website",
            field: 'website',
        },
        {
            label: "Gender",
            field: 'gender',
        },
        {
            label: "Age",
            field: 'age',
        },
        {
            label: "Nationality",
            field: 'nationality',
        },
        {
            label: "Created By",
            field: "created_by",
        },
        {
            label: "Created At",
            field: 'created_at',
        },
        {
            label: "Actions",
            field: "actions",
        }
    ];

    const renderList = searchQuery.length > 2 ? searchResults : addresses

    const rows = renderList.map((address, idx) => {
        return {
            sn: idx + 1,
            name: address.name ? address.name : 'N/A',
            phone: address.phone ? address.phone : 'N/A',
            email: address.email ? address.email : 'N/A',
            website: address.website ? address.website : 'N/A',
            gender: address.gender ? address.gender : 'N/A',
            age: address.age ? address.age : 'N/A',
            nationality: address.nationality ? address.nationality : 'N/A',
            created_by: address.created_by ? address.created_by : 'N/A',
            created_at: address.created_at ? address.created_at : 'N/A',

            actions: <div>
                <Button component={Link} to={`/address/show/${address.id}`} variant="outlined" size="small" sx={{ mr: 1 }}>
                    Show
                </Button>
                <Button component={Link} to={`/address/edit/${address.id}`} variant="outlined" size="small" color="secondary" sx={{ mr: 1 }}>
                    Edit
                </Button>
                <Button variant="outlined" size="small" color="error" onClick={() => deleteAddress(address.id)}>
                    Delete
                </Button>
            </div>
        }
    })

    return (
        <Layout>
            <Container maxWidth="lg">
                <h2>Address List</h2>
                <Box display="flex" justifyContent="flex-end" >
                    <Button component={Link} to="/address/create" variant="contained" size="small" color="primary" sx={{ mb: 1 }}>
                        Create Address
                    </Button>
                </Box>
                <TableContainer component={Paper} >
                    <TextField
                        variant='outlined'
                        placeholder='Search'
                        type='search'
                        size="small"
                        sx={{ mb: 1 }}
                        onInput={(e) => handleSearchInputChange(e.target.value)}
                    />
                    <DataTable
                        rows={rows}
                        columns={columns}
                    />
                </TableContainer>
            </Container>
        </Layout>
    )
}

