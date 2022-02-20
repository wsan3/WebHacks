import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { collection, where, query, getDoc, getDocs, doc, setDoc, clearIndexedDbPersistence } from "firebase/firestore";
import { db } from '../firebase';
import logo from '../assests/card.png'
import axios from 'axios';


export default function NewExpense() {
    const [group, setGroup] = React.useState('');
    const [venmos, setVenmos] = React.useState([]);
    const [groups, setGroups] = React.useState([]);

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [items, setItems] = React.useState([]);
    const [prices, setPrices] = React.useState([]);
    const [people, setPeople] = React.useState([]);
    const [creator, setCreator] = React.useState('');
    const [parseResults, setParseResults] = React.useState('');
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState(null);

    useEffect(() => {
        // declare the async data fetching function
        const fetchData = async () => {
            const q = query(collection(db, "Groups"));
            const querySnapshot = await getDocs(q);
            let groups = []
            querySnapshot.forEach((doc) => {
                groups.push(doc.data());
            });
            setGroups(groups)
        }

        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);;
    }, [])

    const handleGroupChange = (event) => {
        setGroup(event.target.value);
        groups.map(obj => {
            if (obj.title === event.target.value) {
                setVenmos(obj.venmos);
            }
        })
    };
    const handleTitle = (event) => {
        setTitle(event.target.value);
    };
    const handleDescription = (event) => {
        setDescription(event.target.value);
    };
    const addPrice = (event) => {
        setPrices(oldArray => [...oldArray, event.target.value]);
    };

    const addPerson = (event) => {
        setPrices(oldArray => [...oldArray, event.target.value]);
    };

    const addItemArr = () => {
        setPrices(currArr => [...currArr, '']);
        setItems(currArr => [...currArr, '']);
        setPeople(currArr => [...currArr, '']);
    }

    const clearAll = () => {
        setPrices([]);
        setPeople([]);
        setItems([]);
        setTitle('');
        setDescription('');
    };

    const updateItem = (e, index) => {
        let oldItemsCopy = items;
        oldItemsCopy[index] = e.target.value;
        setItems([...oldItemsCopy]);
    };

    const updateUser = (e, index) => {
        let bruhh = people;
        bruhh[index] = e.target.value;
        setPeople([...bruhh]);
    };

    const updatePrice = (e, index) => {
        let bruhh = prices;
        bruhh[index] = e.target.value;
        setPrices([...bruhh]);
    };


    const submitSuccess = () => {
        setShowSuccess(true);
        setTimeout(function () {
            setShowSuccess(false);
        }, 3000);
    }

    const handleVenmo = (item, phone, price) => {
        window.open("https://venmo.com/" + phone + "?txn=charge&note=" + item + "&amount=" + price);
    };

    const parseReceipt = () => {
        const formData = new FormData();
        formData.append("client_id", "TEST");
        formData.append("recognizer", "auto");
        formData.append("ref_no", 'ocr_nodejs_123');
        formData.append("file", selectedImage);
        axios.post("https://ocr.asprise.com/api/v1/receipt", formData).then((res) => {
            console.log(res);
            setParseResults(res);
            setTitle(res.data.receipts[0].merchant_name)
            res.data.receipts[0].items.forEach((it, idx) => {
                setItems(oldArr => [...oldArr, it.description]);
                setPrices(oldArr => [...oldArr, it.amount]);
                setPeople(oldArr => [...oldArr, '']);
            })

        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
    }

    const submit = () => {
        const usersRef = collection(db, "Expenses");
        setDoc(doc(usersRef, new Date().getTime().toString()), {
            title: title,
            description: description,
            items: items,
            prices: prices,
            people: people,
            group: group,
            createdBy: creator,
            date: Date()
        });
        submitSuccess()
    };

    const showPreview = (event) => {
        if (event.target.files.length > 0) {
            var src = URL.createObjectURL(event.target.files[0]);
            var preview = document.getElementById("file-ip-1-preview");
            preview.src = src;
            preview.style.display = "block";
        }
    }


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
                    < Link style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }} to="/main">Back</Link>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', bgcolor: '#ffffff', height: '700px', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column' }}>
                <Box sx={{ height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {showSuccess ? <Alert severity="success">Success! New expense was added!</Alert> : null}
                </Box>

                <Box sx={{ fontSize: 60, padding: 2, fontWeight: 'bold', color: '#1976d2' }}>Create New Expense</Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{ margin: 3 }} >
                        <img id="file-ip-1-preview" height={400} width={400} />
                    </Box>
                    <Box sx={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

                        <input
                            style={{ padding: 30, marginLeft: 70 }}
                            type="file"
                            name="myImage"
                            onChange={(event) => {
                                console.log(event.target.files[0]);
                                setSelectedImage(event.target.files[0]);
                                showPreview(event);
                            }}

                        />
                        <Button sx={{ margin: 2 }} variant='contained' onClick={() => parseReceipt()} >Parse Receipt</Button>

                    </Box>
                </Box>


                <Box> - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField sx={{ margin: 2, width: '350px' }} id="outlined-basic" value={title} onChange={handleTitle} label="Expense Title" variant="outlined" />
                    {/* <TextField disabled v sx={{ margin: 2, width: '200px' }} id="outlined-basic" label={new Date().toLocaleString()} variant="outlined" /> */}

                    <FormControl sx={{ m: 1, minWidth: 140 }}>
                        <InputLabel>Group</InputLabel>
                        <Select
                            value={group}
                            label="Group"
                            onChange={handleGroupChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            {groups.map((gr) => <MenuItem value={gr.title}>{gr.title}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField sx={{ margin: 2, width: '510px' }} value={description} onChange={handleDescription} id="outlined-basic" label="Description" variant="outlined" />
                </Box>
                {items.map((item, idx) => {
                    return (
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <TextField sx={{ margin: 2, width: '230px' }} value={items[idx]} onChange={e => updateItem(e, idx)} id="outlined-basic" label="Item" variant="outlined" />
                            {/* <TextField sx={{ margin: 2, width: '230px' }} value={people[idx]} onChange={f => updateUser(f, idx)} id="outlined-basic" label="Venmo" variant="outlined" /> */}
                            <FormControl sx={{ m: 2, minWidth: '200px' }}>
                                <InputLabel>Venmo</InputLabel>
                                <Select
                                    value={people[idx]}
                                    label="Venmo"
                                    onChange={f => updateUser(f, idx)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    {venmos.map((gr) => <MenuItem value={gr}>{gr}</MenuItem>)}
                                </Select>
                            </FormControl>

                            <TextField sx={{ margin: 2, width: '230px' }} value={prices[idx]} onChange={g => updatePrice(g, idx)} id="outlined-basic" label="Price" variant="outlined" />
                            <Button variant="contained" sx={{ margin: 2, color: 'white', width: '100px' }} onClick={() => handleVenmo(items[idx], people[idx], prices[idx])}> Charge</Button>
                        </Box>
                    )

                })}
                {/* <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField sx={{ margin: 2, width: '230px' }} id="outlined-basic" label="Email or Phone Number" variant="outlined" />
                    <TextField sx={{ margin: 2, width: '100px' }} id="outlined-basic" label="Price" variant="outlined" />
                    <Button variant="contained" sx={{ margin: 2, color: 'white', width: '100px' }}> Charge</Button>
                </Box> */}
                {/* <TextField disabled sx={{ margin: 2, width: '530px', background: '#f7f7f7' }} id="outlined-basic" label="" variant="outlined" /> */}
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Button variant="contained" color="error" sx={{ margin: 2, marginTop: 4, color: 'white', width: '150px' }} onClick={clearAll}>Clear All</Button>
                    <Button variant="contained" color="warning" sx={{ margin: 2, marginTop: 4, color: 'white', width: '150px' }} onClick={() => { addItemArr() }}>Add Item</Button>
                    <Button variant="contained" color="success" sx={{ margin: 2, marginTop: 4, color: 'white', width: '150px' }} onClick={submit}>Submit</Button>
                </Box>
            </Box>
        </Box>
    );
}