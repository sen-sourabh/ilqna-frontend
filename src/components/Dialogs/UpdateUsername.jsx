import React, { useState } from 'react';
//UI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
//Functions
import * as functions from '../../functions/common/common';
import { updateUsername } from '../../functions/APIs/user-api';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { openUsername } from '../../redux/dialogRedux/update-username-slice';
import { prepareSnackbar, resetSnackbar } from '../../redux/snackbarRedux/snackbar-slice';
import { userData } from '../../redux/loginRedux/login-slice';

export const UpdateUsername = () => {
    const dispatch = useDispatch();
    const { isOpen } = useSelector(state => state.update_username);
    const { username, designation: desig, company: comp } = useSelector(state => state?.login?.userData)
    console.log("USER: ", username, desig, comp);
    // const datad = useSelector(state => state)
    // const [username, setUsername] = useState('');

    const [designation, setDesignation] = useState('');
    const [company, setCompany] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleDesignation = (event) => {
        setDesignation(event.target.value.trim());
    }

    const handleCompany = (event) => {
        setCompany(event.target.value.trim());
    }

    const handleCloseUsername = () => {
        console.log("hii")
        dispatch(openUsername(false))
    }

    const isValid = () => {
        if(!functions.isEmpty(designation)) {
            dispatch(prepareSnackbar({ open: true, severity: 'error', message: 'Please enter a designation.' }));
            setTimeout(() => { dispatch(resetSnackbar()) }, functions.snackbarTimer)
            return false;
        }
        if(!functions.isEmpty(company)) {
            dispatch(prepareSnackbar({ open: true, severity: 'error', message: 'Please enter a company.' }));
            setTimeout(() => { dispatch(resetSnackbar()) }, functions.snackbarTimer)
            return false;
        }
        return true;
    }

    const handleClickToVerifyOpen = async () => {
        isValid();
        let body = {
            _id: !localStorage.getItem('userData') ? '' : JSON.parse(localStorage.getItem('userData'))._id,
            designation,
            company
        };
        setLoading(true)
        await updateUsername(body).then((res) => {
            updateSuccess(res);
        }).catch((error) => {
            dispatch(prepareSnackbar({ open: true, severity: 'error', message: error.message }));
            setTimeout(() => { dispatch(resetSnackbar()) }, functions.snackbarTimer)
            setLoading(false);
            handleCloseUsername();
        });
    }
    
    const updateSuccess = (res) => {
        setLoading(false);
        if(res.code === 200) {
            dispatch(prepareSnackbar({ open: true, severity: 'success', message: res.message }));
            dispatch(userData(res.data[0]))
        } else {
            dispatch(prepareSnackbar({ open: true, severity: 'error', message: res.message }));
        }
        handleCloseUsername();
        setTimeout(() => { dispatch(resetSnackbar()) }, functions.snackbarTimer)
    }

  return (
    <Dialog open={isOpen} onClose={handleCloseUsername}>
        <DialogTitle>Username</DialogTitle>
        <DialogContent>
            <DialogContentText>
            You will recieve a verification code at registered email...
            </DialogContentText>
            <TextField
                margin="dense"
                label="Username"
                type="text"
                fullWidth
                variant="standard"
                inputProps={
					{ readOnly: true, }
				}
                defaultValue={username}
            />
            <TextField
                autoFocus
                margin="dense"
                onChange={handleDesignation}
                label="Designation"
                type="text"
                fullWidth
                defaultValue={desig}
                variant="standard"
                required
            />
            <TextField
                autoFocus
                margin="dense"
                defaultValue={comp}
                onChange={handleCompany}
                label="Company"
                type="text"
                fullWidth
                variant="standard"
                required
            />
        </DialogContent>
        <DialogActions>
            <Button 
                onClick={handleCloseUsername}
            >
                Cancel
            </Button>
            <Button 
                variant="contained"
                loading={loading} 
                onClick={handleClickToVerifyOpen}
            >
                Send
            </Button>
        </DialogActions>
    </Dialog>
  )
}