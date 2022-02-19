import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";

import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { collection, where, query, getDoc, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import { FieldValue } from 'firebase/firestore';


export default function NewGroup() {
    const [items, setItems] = React.useState([]);
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [createdBy, setCreatedBy] = React.useState('');
    const [people, setPeople] = React.useState([]);




    const handleTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleCreatedBy = (event) => {
        setCreatedBy(event.target.value);
    };

    const handlePeople = (event) => {
        setPeople(event.target.value);
    };

    const addItemArr = (event) => {
        setPeople(currArr => [...currArr, '']);
        setItems(currArr => [...currArr, '']);
    };

    const updateUser = (e, index) => {
        let bruhh = people;
        bruhh[index] = e.target.value;
        setPeople([...bruhh]);
    };

    const submitSuccess = () => {
        setShowSuccess(true);
        setTimeout(function () {
            setShowSuccess(false);
        }, 3000);
    }

    const submit = () => {
        const id = new Date().getTime().toString();
        const groupsRef = collection(db, "Groups");

        setDoc(doc(groupsRef, id), {
            createdBy: createdBy,
            title: title,
            expenses: [],
            people: people
        });

        const itemRef = collection(db, 'Users');
        people.forEach(person => {
            
            console.log(person);
            const q = query(itemRef, where("name", "==", person))
            const querySnapshot = getDocs(q)
                .then((d) => {
                    let arr = d[0]
                    //arr.push(id);
                    console.log(d[0].data())
                    // updateDoc(doc(itemRef, person), {
                    //     groups: arr
                    // });
                    // d.forEach((doc) => {
                    //     arr.push({ id: doc.id, ...doc.data() })
                    // })
                    // console.log("test", arr)
                    // this.setState({ items: arr })
                    // arr.filter(word => word.location == this.props.location)
                    // this.props.noResults(arr.length)
                })
        })        


        // var db = firebase.firestore();
        // db2.collection("Users").doc("Q7P2o9HQskJmkSEDaSAX").update({ name: "Jackie Chan" });

        // const usersRef = collection(db, 'Users');
        // const q = query(usersRef, where("name", "==", "Vinesh Janarthanan"))
        // const querySnapshot = getDocs(q)
        //     .then((d) => {
        //         d.forEach((doc) => {
        //             // console.log(doc.id, doc.data().venmo)
        //             db.collection('Users').doc(doc.id).update({
        //                 groups: FieldValue.arrayUnion(id)
        //             });
        //         })
        //     })

        // for (var i = 0; i < people.length; i++) {
        //     usersRef.where('name', '==', "Vinesh Janarthanan");
        // }

        submitSuccess()
    };



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
                    {showSuccess ? <Alert severity="success">Success! New group was created!</Alert> : null}
                </Box>
                <Box sx={{ fontSize: 60, padding: 2, fontWeight: 'bold', color: '#e65d3e' }}>Create New Group</Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField sx={{ margin: 2, width: '300px' }} onChange={handleTitle} id="outlined-basic" label="Title" variant="outlined" />
                    <TextField sx={{ margin: 2, width: '200px' }} onChange={handleCreatedBy} id="outlined-basic" label="Created By" variant="outlined" />
                </Box>

                {items.map((item, idx) => {
                    return (
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <TextField sx={{ margin: 2, width: '535px' }} value={people[idx]} onChange={f => updateUser(f, idx)} id="outlined-basic" label="Friend" variant="outlined" />
                        </Box>
                    )
                })}

                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Button variant="contained" color="warning" sx={{ margin: 2, marginTop: 4, color: 'white', width: '150px' }} onClick={addItemArr}>Add Item</Button>
                    <Button variant="contained" color="success" onClick={submit} sx={{ margin: 2, marginTop: 4, color: 'white', width: '150px' }} >Submit</Button>
                </Box>
            </Box>
        </Box>
    );
}