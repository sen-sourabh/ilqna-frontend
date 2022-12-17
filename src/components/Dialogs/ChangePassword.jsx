import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Tooltip } from '@mui/material';
// import InfoIcon from '@mui/icons-material/Info';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { openChangePassword } from '../../redux/dialogRedux/change-password';
import { changePassword } from '../../functions/APIs/user-api';
import Password from '../../functions/validations/password';
import { prepareSnackbar, resetSnackbar } from '../../redux/snackbarRedux/snackbar-slice';
import * as functions from '../../functions/common/common';
import { useNavigate } from 'react-router-dom';
import { isLogout } from '../../redux/loginRedux/login-slice';

export const ChangePassword = ({ email }) => {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isOpen } = useSelector(state => state.change_password);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [cnewPassword, setCNewPassword] = useState('');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleOldPassword = (e) => {
    setOldPassword(e.target.value)
  }

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value)
  }

  const handleCNewPassword = (e) => {
    setCNewPassword(e.target.value)
  }
  
  const isValid = () => {
    console.log("is Valid: ", oldPassword, newPassword, cnewPassword);
      if(!functions.isEmpty(oldPassword) || !functions.isEmpty(oldPassword) || !functions.isEmpty(oldPassword)) {
        dispatch(prepareSnackbar({ open: true, severity: 'error', message: 'All fields are required.' }));
        setTimeout(() => { dispatch(resetSnackbar()) }, functions.snackbarTimer)
        return false;
      }
      if(!Password.isValidPassword(oldPassword)) {
        dispatch(prepareSnackbar({ open: true, severity: 'error', message: 'Please enter a valid old password.' }));
        setTimeout(() => { dispatch(resetSnackbar()) }, functions.snackbarTimer)
        return false;
      }
      if(!Password.isValidPassword(newPassword)) {
        dispatch(prepareSnackbar({ open: true, severity: 'error', message: 'Please enter a valid new password.' }));
        setTimeout(() => { dispatch(resetSnackbar()) }, functions.snackbarTimer)
        return false;
      }
      if(!Password.isValidPassword(cnewPassword)) {
        dispatch(prepareSnackbar({ open: true, severity: 'error', message: 'Please enter a valid confirm new password.' }));
        setTimeout(() => { dispatch(resetSnackbar()) }, functions.snackbarTimer)
        return false;
      }
      if(!Password.isPasswordMatch(newPassword, cnewPassword)) {
        dispatch(prepareSnackbar({ open: true, severity: 'error', message: 'New password & Confirm password are not matched.' }));
        setTimeout(() => { dispatch(resetSnackbar()) }, functions.snackbarTimer)
        return false;
      }
      console.log(oldPassword, newPassword, cnewPassword);
      return true;
  }

  const handleChangePassword = async () => {
    if(isValid()) {
        setLoading(true)
        await changePassword({ email, oldPassword, newPassword }).then((res) => {
            onChangePasswordSuccess(res)
        }).catch((error) => {
            setLoading(false);
            dispatch(prepareSnackbar({ open: true, severity: 'error', message: error.message }));
            setTimeout(() => { dispatch(resetSnackbar()) }, functions.snackbarTimer)
        })
    } else {
        return false;
    }
  }

  const onChangePasswordSuccess = (res) => {
    setLoading(false);
    if(res.code === 200) {
      dispatch(prepareSnackbar({ open: true, severity: 'success', message: res.message }));
      handleClickLogout();
    } else {
      dispatch(prepareSnackbar({ open: true, severity: 'error', message: res.message }));
    }
    setTimeout(() => { dispatch(resetSnackbar()) }, functions.snackbarTimer)
  }

  const handleClickLogout = () => {
    dispatch(prepareSnackbar({ open: true, severity: 'success', message: 'Logout successfully.' }));
    setTimeout(() => { dispatch(resetSnackbar()) }, functions.snackbarTimer)
    dispatch(isLogout(false));
    navigate('/');
    functions.goingForLogout();
  };

  const handleClosePassword = () => {
    dispatch(openChangePassword(false));
  };

  return (
    <Dialog open={isOpen} onClose={handleClosePassword}>
        <DialogTitle>
            Change Password
            <br></br>
            <h6 
              style={{margin: 0, fontWeight: 100, fontSize: '12px'}}
            >
              Password should contain minimum 8 characters that includes capital letter, small letter, special character, and number.
              <br></br>You have to login again after changing your password.
            </h6>
        </DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Current Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••••"
            fullWidth
            variant="standard"
            required
            onChange={handleOldPassword}
        />
        <TextField
            margin="dense"
            id="newpassword"
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••••"
            fullWidth
            variant="standard"
            required
            onChange={handleNewPassword}
        />
        <TextField
            margin="dense"
            id="cnewpassword"
            label="Confirm New Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••••"
            fullWidth
            variant="standard"
            required
            onChange={handleCNewPassword}
        />
        <p 
            position="end" 
            className="show-password"
        >
            <span onClick={handleClickShowPassword} >{showPassword ? 'Hide Password' : 'Show Password'}</span>
        </p>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClosePassword}>Cancel</Button>
        <Button variant="contained" onClick={handleChangePassword}>Change</Button>
        </DialogActions>
    </Dialog>
  )
}
