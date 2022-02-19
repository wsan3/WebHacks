import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";

import Button from '@mui/material/Button';


export default function Main() {
    return (
        <Box style={{
            height: '750px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            backgroundColor: '#e3f3ff',
            padding: 0,
            margin: 0,
        }}>
            <Box sx={{ bgcolor: '#696969', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 2 }}>
                    <Box sx={{ fontSize: 20, padding: 2, fontWeight: 'bold', color: 'white' }}>S L I C E</Box>
                </Box>
                <Box sx={{ bgcolor: '#1976d2', width: '100px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 1, margin: 5 }}>
                    < Link style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }} to="/dashboard">Dashboard</Link>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', bgcolor: '#ffffff', height: '690px', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                < Link style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }} to="/addexpense">
                    <Button variant="contained" sx={{ width: '300px', height: '50px', margin: 2 }}>Add New Expense</Button>
                </Link>
                < Link style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 500 }} to="/newgroup">
                    <Button variant="outlined" sx={{ width: '300px', height: '50px', margin: 2 }}>Create New Group</Button>
                </Link>
            </Box>
        </Box>
    );
}