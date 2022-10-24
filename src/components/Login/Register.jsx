import React, { Fragment, useRef, useState } from 'react';
//UI
import { Divider, Paper, Stack, TextField, Tooltip, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
//Routers
import {
  Link,
  useNavigate
} from "react-router-dom";
//SCSS
import '../../sass/main.scss';
import '../../sass/login.scss';
//Component
// import LoginBg from '../backgrounds/LoginBg';
//Icons
import InfoIcon from '@mui/icons-material/Info';

import * as functions from '../../functions/common/common';
import Email from '../../functions/validations/email';
import Password from '../../functions/validations/password';
import { Messages } from '../Alerts/Messages';
import Phone from '../../functions/validations/phone';
import { signUpWithEmailAndPassword } from '../../functions/APIs/login-api';

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [options, setOptions] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleChangePhone = (event) => {
    setPhone(event.target.value)
  }
  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }
  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }

  const isValid = () => {
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
    if(!Phone.isValidPhone(phone)) {
      setOptions({open: true, severity: 'error', message: 'Please enter a valid mobile no.'});
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, functions.snackbarTimer);
      return false;
    }
    return true;
  }

  const handleClick = async () => {
    if(!isValid()) return false;
    setLoading(true);
    let newUserData = {
      username: functions.generatedUsernameByEmail(email),
      email,
      password,
      phone,
    };
    await signUpWithEmailAndPassword(newUserData).then((res) => {
      signUpSuccess(res);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }

  const signUpSuccess = (res) => {
    setLoading(false);
    if(res.code == 200) {
      setOptions({open: true, severity: 'success', message: res.message});
      setTimeout(() => {
        setShowMessage(false);
        navigate('/');
      }, functions.snackbarTimer);
    } else {
      setOptions({open: true, severity: 'error', message: res.message});
      setTimeout(() => {
        setShowMessage(false);
      }, functions.snackbarTimer);
    }
    setShowMessage(true);
  }

  return (
    <Fragment>
      {/* <LoginBg /> */}
      <Paper
        style={{backgroundColor: 'transparent'}}
        className='login-window'
        elevation={12}
      >
        <Typography variant='h4' align='center'>Sign Up</Typography>
        <Typography variant='h6' align='center'>Continue with us</Typography>
        <Typography variant='subtitle2' align='center'>😃 You will get the answers here 😃</Typography>
        <Stack
          className='stack-style'
          spacing={{ xs: 2, md: 2 }}
        >
            <TextField 
              id="standard-basic" 
              label="Email" 
              variant="standard"
              placeholder="example@example.com"
              onChange={handleChangeEmail}
              required
            />
            <TextField
              id="standard-basic" 
              label="Password" 
              type={showPassword ? 'text' : 'password'}
              variant="standard"
              onChange={handleChangePassword}
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
            <TextField 
              id="standard-basic" 
              label="Mobile No." 
              variant="standard"
              onChange={handleChangePhone}
              required
            />
            <p 
              position="end" 
              className="show-password"
            >
              <span>
                <Tooltip title="Please enter mobile no. should be of 10 digits in valid format. For example: +XX1234567890 / +XX 1234567890 / 1234567890" placement="right" arrow>
                  <InfoIcon className='info-icon'/>
                </Tooltip>
              </span>
            </p>
            <LoadingButton
              margin="normal" 
              onClick={handleClick}
              loading={loading}
              variant="contained"
            >
              <b>SIGN UP</b>
            </LoadingButton>
            <div className='other-link'>
              <Link to="/">Sign In?</Link>
            </div>
        </Stack>
      </Paper>
      {showMessage && <Messages options={options} />}
    </Fragment>
  )
}
