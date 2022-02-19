import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";

import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';


export default function NewGroup() {
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
                    < Link style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }} to="/main">Back</Link>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', bgcolor: '#ffffff', height: '700px', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column' }}>
                <Box sx={{ height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {true ? <Alert severity="success">Success! New group was created!</Alert> : null}
                </Box>
                <Box sx={{ fontSize: 60, padding: 2, fontWeight: 'bold', color: '#e65d3e' }}>Create New Group</Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField  sx={{ margin: 2, width: '300px' }} id="outlined-basic" label="Item" variant="outlined" />
                    <TextField disabled v sx={{ margin: 2, width: '200px' }} id="outlined-basic" label="Found Date" variant="outlined" />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField  sx={{ margin: 2, width: '200px' }} id="outlined-basic" label="Email" variant="outlined" />
                    <TextField  sx={{ margin: 2, width: '300px' }} id="outlined-basic" label="Keywords" variant="outlined" />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField sx={{ margin: 2, width: '300px' }} id="outlined-basic" label="Location" variant="outlined" />
                    <Button variant="contained" sx={{ margin: 2, color: 'white', width: '200px' }}> Search</Button>
                </Box>
                <TextField disabled sx={{ margin: 2, width: '530px', background: '#f7f7f7' }} id="outlined-basic" label="" variant="outlined" />

                <Button variant="contained" color="success" sx={{ margin: 2, marginTop: 4, color: 'white', width: '150px' }} >Submit</Button>
            </Box>
        </Box>
    );
}