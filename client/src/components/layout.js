import React from 'react';
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Box, Typography, Button } from '@mui/material';
import Cookies from "js-cookie";
import swal from 'sweetalert'

const Layout = ({ children }) => {

    let navigate = useNavigate();

    const handleLogout = async e => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to logout?",
            icon: "warning",
            dangerMode: true,
        })
            .then(res => {
                if (res) {
                    Cookies.remove("access_token")
                    navigate('/')
                }
            });
    }

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Address Book
                        </Typography>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            {children}
        </React.Fragment>
    )
}

export default Layout;
