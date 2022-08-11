import React, { Fragment, useState } from 'react';
//Routers
import {
  Link
} from "react-router-dom";
//UI
import { Divider, Paper, Stack, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
//SCSS
import '../../sass/main.scss';
import LoginBg from '../backgrounds/LoginBg';

export default function ForgotPassword() {
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
        <Typography variant='h4' align='center'>Forgot Password</Typography>
        <Typography variant='h6' align='center'>Continue with us</Typography>
        <Typography variant='subtitle2' align='center'>😃 You will get the answers here 😃</Typography>
        <Stack
          className='stack-style'
          spacing={{ xs: 2, md: 2 }}
        >
            <TextField 
              id="standard-basic" 
              label="Old Password" 
              variant="standard"
              placeholder="example@example.com"
            />
            <TextField
              id="standard-basic" 
              label="New Password" 
              variant="standard"
            />
            <TextField
              id="standard-basic" 
              label="Confirm New Password" 
              variant="standard"
            />
            <LoadingButton
              margin="normal" 
              onClick={handleClick}
              // endIcon={<LoginIcon />}
              loading={loading}
              // loadingPosition="end"
              variant="contained"
            >
              <b>RESET PASSWORD</b>
            </LoadingButton>
            <div className='other-link'>
              <Link to="/">Remember Password?</Link>
            </div>
        </Stack>
      </Paper>
          {/* <Link to="/register">Register</Link>
          <Link to="/forgot-password">Forgot Password</Link> */}
    </Fragment>
  )
}
