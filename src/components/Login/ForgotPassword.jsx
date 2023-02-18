import React, { Fragment, useEffect, useState } from 'react';
//Routers
import {
  Link,
  useNavigate
} from "react-router-dom";
//UI
import { Tooltip, Paper, Stack, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
//Icons
import InfoIcon from '@mui/icons-material/Info';
//SCSS
// import '../../sass/main.scss';
import Email from '../../functions/validations/email';
import Password from '../../functions/validations/password';
import { forgotPassword, resetPassword } from '../../functions/APIs/login-api';
import { useDispatch, useSelector } from 'react-redux';
import { changeForm } from '../../redux/loginRedux/forgotPassword-slice';
import { isVerifyOpen, setOTP } from '../../redux/dialogRedux/verification-slice';
import { prepareSnackbar, resetSnackbar } from '../../redux/snackbarRedux/snackbar-slice';
import * as functions from '../../functions/common/common';
import Loader from '../Loaders/loader';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isForm } = useSelector(state => state.forgotPassword)
  const [email, setEmail] = useState();
  const [newPassword, setNewPassword] = useState();
  const [cnewPassword, setCNewPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  }

  const handleChangeNewPassword = (event) => {
    setNewPassword(event.target.value)
  }

  const handleChangeConfirmPassword = (event) => {
    setCNewPassword(event.target.value)
  }

  const isValid = () => {
    if(!Email.isValidEmail(email)) {
      dispatch(prepareSnackbar({ open: true, severity: 'error', message: 'Please enter a valid email.' }));
      setTimeout(() => { dispatch(resetSnackbar()) }, functions.snackbarTimer)
      return false;
    }
    return true;
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const isResetValid = () => {
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
    return true;
  }
  
  const handleReset = async () => {
    if(!isResetValid()) return false;
    setLoading(true);
    await resetPassword({ email, newPassword }).then((res) => {
      onResetSuccess(res);
    }).catch((error) => {
      setLoading(false);
      dispatch(prepareSnackbar({ open: true, severity: 'error', message: error.message }));
      setTimeout(() => { dispatch(resetSnackbar()) }, functions.snackbarTimer)
    });
  }

  const onResetSuccess = (res) => {
    setLoading(false);
    if(res.code === 200) {
      dispatch(prepareSnackbar({ open: true, severity: 'success', message: res.message }));
    } else {
      dispatch(prepareSnackbar({ open: true, severity: 'error', message: res.message }));
    }
    setTimeout(() => { dispatch(resetSnackbar()) }, functions.snackbarTimer)
    dispatch(changeForm(true));
    navigate('/');
  }

  const handleOpenVerify = async () => {
    if(!isValid()) return false;
    setLoading(true);
    await forgotPassword({ email }).then((res) => {
      onSuccess(res);
    }).catch((error) => {
      setLoading(false);
      dispatch(prepareSnackbar({ open: true, severity: 'error', message: error.message }));
      setTimeout(() => { dispatch(resetSnackbar()) }, functions.snackbarTimer)
    });
  }

  const onSuccess = (res) => {
    setLoading(false);
    if(res.code === 200) {
      dispatch(isVerifyOpen(true));
      dispatch(setOTP(res.otp));
      dispatch(prepareSnackbar({ open: true, severity: 'success', message: res.message }));
    } else {
      dispatch(prepareSnackbar({ open: true, severity: 'error', message: res.message }));
    }
    setTimeout(() => { dispatch(resetSnackbar()) }, functions.snackbarTimer)
  }


  return (
    <Fragment>
      {isLoading && <Loader />}
      <Paper
         style={{backgroundColor: 'transparent'}}
         className='login-window'
         elevation={12}
      >
        <Typography variant='h4' align='center'>{ isForm ? 'Forgot Password' : 'Reset Password' }</Typography>
        <Typography variant='h6' align='center'>Continue with us</Typography>
        <Typography variant='subtitle2' align='center'>😃 You will get the answers here 😃</Typography>
        <Stack
          className='stack-style'
          spacing={{ xs: 2, md: 2 }}
        >
            { isForm && 
              <>
                <TextField 
                  id="standard-basic" 
                  label="Email" 
                  variant="standard"
                  placeholder="example@example.com"
                  required
                  onChange={handleChangeEmail}
                />
                <LoadingButton
                  margin="normal" 
                  onClick={handleOpenVerify}
                  loading={loading}
                  variant="contained"
                >
                  <b>Send</b>
                </LoadingButton>
              </>
            }
            { !isForm && 
              <>
                <TextField
                  id="standard-basic" 
                  label="New Password" 
                  variant="standard"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••"
                  onChange={handleChangeNewPassword}
                  required
                />
                <TextField
                  id="standard-basic" 
                  label="Confirm New Password" 
                  variant="standard"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••"
                  onChange={handleChangeConfirmPassword}
                  required
                />
                <p 
                  position="end" 
                  className="show-password"
                >
                  <span onClick={handleClickShowPassword} >{showPassword ? 'Hide Password' : 'Show Password'}</span>
                  <span>
                    <Tooltip title="Password should contain minimum 8 characters that includes capital letter, small letter, special character, and number." placement="right" arrow>
                      <InfoIcon className='info-icon'/>
                    </Tooltip>  
                  </span>
                </p>
                <LoadingButton
                  margin="normal" 
                  onClick={handleReset}
                  loading={loading}
                  variant="contained"
                >
                  <b>RESET PASSWORD</b>
                </LoadingButton>
              </>
            }
            <div className='other-link'>
              <Link to="/login">Remember Password?</Link>
            </div>
        </Stack>
      </Paper>
    </Fragment>
  )
}
