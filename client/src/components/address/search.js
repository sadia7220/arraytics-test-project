import React, { useEffect } from 'react';
import axios from 'axios';
import { TextField } from '@mui/material';

export default function Search({ searchQuery, setSearchQuery, setSearchResults, token }) {

    useEffect(() => {
        if (searchQuery.length > 1) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/addresses/search/${searchQuery}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(({ data }) => {
                setSearchResults(data.data)
            })
        }
    }, [searchQuery, setSearchResults, token])

    const handleSearchInputChange = (value) => {
        setSearchQuery(value)
    }

    return (
        <TextField
            variant='outlined'
            placeholder='Search'
            type='search'
            size="small"
            sx={{ mb: 1, mt: 1 }}
            onInput={(e) => handleSearchInputChange(e.target.value)}
        />
    );
}