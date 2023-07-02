import React, { Fragment, useEffect, useRef, useState } from 'react'

//Routers
import {
  Link, useNavigate
} from "react-router-dom";

//SCSS
import '../../sass/login.scss';

//UI
import { Divider, Paper, Stack, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
// import LoginIcon from '@mui/icons-material/Login';
import GoogleIcon from '@mui/icons-material/Google';
import RedditIcon from '@mui/icons-material/Reddit';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InfoIcon from '@mui/icons-material/Info';

//Validations
import * as functions from '../../functions/common/common';
import Email from '../../functions/validations/email';
import Password from '../../functions/validations/password';


//Component
import { useDispatch } from 'react-redux';
import { isLogin, userData } from '../../redux/loginRedux/login-slice';
import { signInWithEmailAndPassword } from '../../functions/APIs/login-api';
import { prepareSnackbar, resetSnackbar } from '../../redux/snackbarRedux/snackbar-slice';
import Loader from '../Loaders/loader';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const handleEmail = (event) => {
    setEmail(event.target.value.trim());
  }

  const handlePassword = (event) => {
    setPassword(event.target.value.trim());
  }

  const isValid = (email, password) => {
    if(!Email.isValidEmail(email)) {
      dispatch(prepareSnackbar({ open: true, severity: 'error', message: 'Please enter a valid email.' }));
      setTimeout(() => { dispatch(resetSnackbar()) }, functions.snackbarTimer)
      return false;
    }
    if(!Password.isValidPassword(password)) {
      dispatch(prepareSnackbar({ open: true, severity: 'error', message: 'Please enter a valid password.' }));
      setTimeout(() => { dispatch(resetSnackbar()) }, functions.snackbarTimer)
      return false;
    }
    return true;
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleLogin = async () => {
    if(!isValid(email, password)) return false;
    setLoading(true);
    let loginData = {
      email,
      password,
      loginDate: new Date().toISOString(),
      ipAddress: localStorage.getItem('ipLocationData') ? JSON.parse(localStorage.getItem('ipLocationData')).ipAddress : null,
      location: localStorage.getItem('ipLocationData') ? JSON.parse(localStorage.getItem('ipLocationData')).location : null,
    }
    await signInWithEmailAndPassword(loginData).then((res) => {
      signInSuccess(res);
    }).catch((error) => {
      dispatch(prepareSnackbar({ open: true, severity: 'error', message: error.message }));
      setTimeout(() => { dispatch(resetSnackbar()) }, functions.snackbarTimer)
      setLoading(false);
    });
  }

  const signInSuccess = (res) => {
    setLoading(false);
    if(res.code === 200) {
      dispatch(prepareSnackbar({ open: true, severity: 'success', message: res.message }));
      dispatch(isLogin(true));
      dispatch(userData(res.data[0]))
      navigate('/');
    } else {
      dispatch(prepareSnackbar({ open: true, severity: 'error', message: res.message }));
    }
    setTimeout(() => { dispatch(resetSnackbar()) }, functions.snackbarTimer)
  }

  return (
    <Fragment>
      {isLoading && <Loader />}
      <div className='login'>
        <Paper
            style={{backgroundColor: 'transparent'}}
            className='login-window'
            // elevation={12}
        >
          <Typography variant='h4' align='center'>Log In</Typography>
          <Typography variant='h6' align='center'>Continue with us</Typography>
          <Typography variant='subtitle2' align='center'>😃 You will get the answers here 😃</Typography>
          <Stack
            className='stack-style'
            spacing={{ xs: 2, md: 2 }}
          >
              <TextField
                autoFocus
                type="email"
                label="Email"
                variant="standard"
                placeholder="example@example.com"
                onChange={handleEmail}
                ref={emailRef}
                required
              />
              <TextField
                label="Password" 
                variant="standard"
                onChange={handlePassword}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••"
                ref={passwordRef}
                required
              />
              <p 
                position="end" 
                className="show-password"
              >
                <span onClick={handleClickShowPassword} >{showPassword ? 'Hide Password' : 'Show Password'}</span>
                <span>
                  <InfoIcon className='info-icon'/>
                </span>
              </p>
              <LoadingButton
                className="loading-btn"
                margin="normal" 
                onClick={handleLogin}
                loading={loading}
                variant="contained"
              >
                <b>SIGN IN</b>
              </LoadingButton>
              <div className='other-link'>
                <Link to="/register">Do not have an account?</Link>
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
              <Divider><small><b><i>CONTINUE WITH</i></b></small></Divider>
          </Stack>
          <div className="login-icon-palette">
              <GoogleIcon className="login-icon google" />
              <RedditIcon className="login-icon reddit" />
              <LinkedInIcon className="login-icon linkedin" />
              <GitHubIcon className="login-icon github" />
          </div>
        </Paper>
      </div>
    </Fragment>
  )
}
