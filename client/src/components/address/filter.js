import React, { useEffect } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function Filter({ filterQuery, setFilterQuery, setFilterResults, token }) {

    useEffect(() => {
        if (filterQuery) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/addresses/filter/${filterQuery}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(({ data }) => {
                setFilterResults(data.data)
            })
        }
    }, [filterQuery, setFilterResults, token])

    const handleFilterInputChange = (value) => {
        setFilterQuery(value)
    }

    return (
        <FormControl sx={{ ml: 1, mt: 1, minWidth: 180 }} size="small">
            <InputLabel id="demo-simple-select-label"
            >Filter by gender</InputLabel>
            <Select labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Filter by gender"
                value=""
                onChange={(e) => handleFilterInputChange(e.target.value)}
            >
                <MenuItem value={'male'}>Male</MenuItem>
                <MenuItem value={'female'}>Female</MenuItem>
                <MenuItem value={'other'}>Other</MenuItem>
                <MenuItem value=''>None</MenuItem>
            </Select>
        </FormControl>
    );
}