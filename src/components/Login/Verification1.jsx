import React, { Fragment, useState } from 'react';
//Routers
import { Link } from 'react-router-dom';
//UI
import { Paper, Stack, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
//SCSS
import '../../sass/main.scss';
import '../../sass/login.scss';
//Components
// import LoginBg from '../backgrounds/LoginBg';

export default function Verification1() {
    const [loading, setLoading] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState('00:00');
  
    const handleClick = () => {
      setLoading(true);
    }
  
    return (
      <Fragment>
        {/* <LoginBg /> */}
        <Paper
           style={{backgroundColor: 'transparent'}}
           className='login-window'
           elevation={12}
        >
          <Typography variant='h4' align='center'>Verification</Typography>
          <Typography variant='h6' align='center'>Continue with us</Typography>
          <Typography variant='subtitle2' align='center'>😃 You will get the answers here 😃</Typography>
          <Stack
            className='stack-style'
            spacing={{ xs: 2, md: 2 }}
          >
              <TextField 
                id="standard-basic" 
                label="Verification Code" 
                variant="standard"
                required
              />
              <LoadingButton
                margin="normal" 
                onClick={handleClick}
                loading={loading}
                variant="contained"
              >
                <b>VERIFY</b>
              </LoadingButton>
              <div className='other-link'>
                <Link to="/register">We'll resend code in {timeRemaining}</Link>
                <Link to="/">Sign In?</Link>
              </div>
          </Stack>
        </Paper>
            {/* <Link to="/register">Register</Link>
            <Link to="/forgot-password">Forgot Password</Link> */}
      </Fragment>
    )
}