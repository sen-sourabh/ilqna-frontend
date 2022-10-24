import React, { useRef, useState } from 'react'

//Routers
import {
  Link,
} from "react-router-dom";

//SCSS
import '../../sass/main.scss';
import '../../sass/login.scss';

//UI
import { Divider, Paper, Stack, TextField, Tooltip, Typography } from '@mui/material';
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
import { Messages } from '../Alerts/Messages';
import { useDispatch } from 'react-redux';
import { isLogin, userData } from '../../redux/loginRedux/login-slice';
import { signInWithEmailAndPassword } from '../../functions/APIs/login-api';

export default function Login() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [options, setOptions] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const handleEmail = (event) => {
    setEmail(event.target.value.trim());
  }

  const handlePassword = (event) => {
    setPassword(event.target.value.trim());
  }

  const isValid = (email, password) => {
    if(!Email.isValidEmail(email)) {
      setOptions({open: true, severity: 'error', message: 'Please enter a valid email.'});
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, functions.snackbarTimer);
      return false;
    }
    if(!Password.isValidPassword(password)) {
      setOptions({open: true, severity: 'error', message: 'Please enter a valid password.'});
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, functions.snackbarTimer);
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
      loginDate: new Date().toISOString()
    }
    await signInWithEmailAndPassword(loginData).then((res) => {
      signInSuccess(res);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }

  const signInSuccess = (res) => {
    setLoading(false);
    if(res.code == 200) {
      setOptions({open: true, severity: 'success', message: res.message});
      setTimeout(() => {
        setShowMessage(false);
        dispatch(isLogin(true));
        dispatch(userData(res.data[0]))
      }, 1000);
    } else {
      setOptions({open: true, severity: 'error', message: res.message});
      setTimeout(() => {
        setShowMessage(false);
      }, functions.snackbarTimer);
    }
    setShowMessage(true);
  }

  return (
    <div className='login'>
      <Paper
          style={{backgroundColor: 'transparent'}}
          className='login-window'
          elevation={12}
      >
        <Typography variant='h4' align='center'>Sign In</Typography>
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
                <Tooltip title="Password should contain minimum 8 characters that includes capital letter, small letter, special character, and number." placement="right" arrow>
                  <InfoIcon className='info-icon'/>
                </Tooltip>
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
              <Link to="/register">Sign Up?</Link>
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <Divider><small><b><i>CONTINUE WITH</i></b></small></Divider>
        </Stack>
        <div className="login-icon-palette">
          <Tooltip title="Google" placement="bottom" arrow>
            <GoogleIcon className="login-icon google" />
          </Tooltip>
          <Tooltip title="Reddit" placement="bottom" arrow>
            <RedditIcon className="login-icon reddit" />
          </Tooltip>
          <Tooltip title="LinkedIn" placement="bottom" arrow>
            <LinkedInIcon className="login-icon linkedin" />
          </Tooltip>
          <Tooltip title="GitHub" placement="bottom" arrow>
            <GitHubIcon className="login-icon github" />
          </Tooltip>
        </div>
      </Paper>
      {showMessage && <Messages options={options} />}
    </div>
  )
}
