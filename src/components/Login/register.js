import React, { Fragment, useState } from 'react';
//UI
import { Divider, Paper, Stack, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
//Routers
import {
  Link
} from "react-router-dom";
//SCSS
import '../../sass/main.scss';
import '../../sass/login.scss';
//Component
import LoginBg from '../backgrounds/LoginBg';

export default function Register() {
  const [loading, setLoading] = useState(false);
  
  const handleClick = () => {
    setLoading(true);
  }

  return (
    <Fragment>
      <LoginBg />
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
              label="Username" 
              variant="standard"
            />
            <TextField 
              id="standard-basic" 
              label="Email" 
              variant="standard"
              placeholder="example@example.com"
            />
            <TextField
              id="standard-basic" 
              label="Password" 
              variant="standard"
            />
            <LoadingButton
              margin="normal" 
              onClick={handleClick}
              // endIcon={<LoginIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              <b>SIGN UP</b>
            </LoadingButton>
            <div className='other-link'>
              <Link to="/login">Sign In?</Link>
            </div>
        </Stack>
      </Paper>
          {/* <Link to="/register">Register</Link>
          <Link to="/forgot-password">Forgot Password</Link> */}
    </Fragment>
  )
}
