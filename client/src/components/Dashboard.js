import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import logo from '../assests/card.png'
import { collection, where, query, getDoc, getDocs, doc, setDoc, clearIndexedDbPersistence } from "firebase/firestore";
import { db } from '../firebase';

export default function Dashboard() {
    const [group, setGroup] = React.useState('');
    // const [venmos, setVenmos] = React.useState([]);
    const [groups, setGroups] = React.useState([]);

    React.useEffect(() => {
        // declare the async data fetching function
        const fetchData = async () => {
            const q = query(collection(db, "Groups"));
            const querySnapshot = await getDocs(q);
            let groups = []
            querySnapshot.forEach((doc) => {
                groups.push(doc.data());
            });
            setGroups(groups)
            console.log(groups)
        }

        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);;
    }, [])

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
            <Box sx={{ bgcolor: '#303030', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 2 }}>
                    <img style={{ height: '40px' }} src={logo} alt="Logo" />
                    <Box sx={{ fontSize: 20, padding: 2, fontWeight: 'bold', color: 'white' }}>S L I C E</Box>
                </Box>
                <Box sx={{ bgcolor: '#1976d2', width: '100px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 1, margin: 5 }}>
                    < Link style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }} to="/main">Main</Link>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', bgcolor: '#ffffff', height: '690px', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <Box sx={{ width: '600px', height: '600px', margin: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Button variant="outlined" sx={{ width: '500px', margin: 2 }}>Friends</Button>

                    <Box sx={{ width: '100%', height: 400, maxWidth: 500, bgcolor: 'background.paper' }} >
                        <Table sx={{ minWidth: 500 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
                                    <TableCell style={{ fontWeight: "bold" }}>Venmo</TableCell>
                                </TableRow>

                            </TableHead>

                            <TableBody>
                                <TableRow >
                                    <TableCell align="left">Vinesh Janarthanan</TableCell>
                                    <TableCell align="left">2624428111</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="left">Luke Selberg</TableCell>
                                    <TableCell align="left">2622972534</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </Box>
                <Box sx={{ width: '600px', height: '600px', margin: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Button variant="contained" sx={{ width: '500px', margin: 2 }}>Expenses</Button>

                    <Box sx={{ width: '100%', height: 400, maxWidth: 500, bgcolor: 'background.paper' }} >
                        <Table sx={{ minWidth: 500 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: "bold" }}>Groups</TableCell>
                                    <TableCell style={{ fontWeight: "bold" }} align="right">Number Receipts</TableCell>
                                    <TableCell style={{ fontWeight: "bold" }} align="right">Number of People</TableCell>
                                </TableRow>

                            </TableHead>

                            <TableBody>
                                {groups.map((row) => (
                                    <TableRow
                                        key={row.title}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.title}
                                        </TableCell>
                                        <TableCell align="right">{row.expenses.length}</TableCell>
                                        <TableCell align="right">{row.venmos.length}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}