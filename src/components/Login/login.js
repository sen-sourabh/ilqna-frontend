import React, { Fragment, useState } from 'react'
//Routers
// import {
//   Link
// } from "react-router-dom";
//SCSS
import '../../sass/main.scss';
import '../../sass/login.scss';
//UI
import { Chip, Divider, Paper, Stack, TextField, Tooltip, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
// import LoginIcon from '@mui/icons-material/Login';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import RedditIcon from '@mui/icons-material/Reddit';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

//Component
import LoginBg from '../backgrounds/loginBg';
import { Link } from 'react-router-dom';

export default function Login() {
  const [loading, setLoading] = useState(false);
  function handleClick() {
    setLoading(true);
  }

  return (
    <Fragment>
      <LoginBg />
      <Paper
         className='login-window'
         elevation={12}
      >
        <Typography variant='h4' align='center'>Login</Typography>
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
            />
            <TextField
              id="standard-basic" 
              label="Password" 
              variant="standard"
            />
            <Tooltip title="Continue with us" placement="left" arrow>
              <LoadingButton
                margin="normal" 
                onClick={handleClick}
                // endIcon={<LoginIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
              >
                LOGIN
              </LoadingButton>
            </Tooltip>
            <Link to="/register" >Forgot password?</Link>
            <Link to="/register" >Create Account?</Link>
            <Divider><small><b><i>CONTINUE WITH</i></b></small></Divider>
        </Stack>
        <div className="login-icon-palette">
          <Tooltip title="Google" placement="bottom" arrow>
            <GoogleIcon className="login-icon google" />
          </Tooltip>
          <Tooltip title="Facebook" placement="bottom" arrow>
            <FacebookIcon className="login-icon facebook" />
          </Tooltip>
          <Tooltip title="Reddit" placement="bottom" arrow>
            <RedditIcon className="login-icon reddit" />
          </Tooltip>
          <Tooltip title="LinkedIn" placement="bottom" arrow>
            <LinkedInIcon className="login-icon linkedin" />
          </Tooltip>
          <Tooltip title="WhatsApp" placement="bottom" arrow>
            <WhatsAppIcon className="login-icon whatsapp" />
          </Tooltip>
          <Tooltip title="GitHub" placement="bottom" arrow>
            <GitHubIcon className="login-icon github" />
          </Tooltip>
        </div>
      </Paper>
          {/* <Link to="/register">Register</Link>
          <Link to="/forgot-password">Forgot Password</Link> */}
    </Fragment>
    
  )
}
