import React, { Fragment, useState, useEffect } from 'react';
//Routers
import {
  Link,
  useNavigate
} from "react-router-dom";
//UI
import { Tooltip, Paper, Stack, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

//SCSS
import '../../sass/main.scss';
import LoginBg from '../backgrounds/LoginBg';

export default function ForgotPassword() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [firstEmail, setFirstEmail] = useState(true);
  const [openVerify, setOpenVerify] = useState(false);
  const [verifyTimer, setVerifyTimer] = useState(null);

  
  const handleClick = () => {
    setLoading(true);
    navigate('/')
  }

  const handleOpenVerify = () => {
    console.log("Sent mail")
    setOpenVerify(true);
    setVerifyTimer(60);
  }

  useEffect(() => {
    let timer;
    if(openVerify) {
      timer = verifyTimer > 0 ? setInterval(() => setVerifyTimer(verifyTimer - 1), 1000) : handleCloseVerify()
    }
    return () => { clearInterval(timer); }
  });

  const handleCloseVerify = () => {
    console.log("Process cancel");
    setOpenVerify(false);
    navigate('/');
  }

  const handleVerify = () => {
    setOpenVerify(false);
    setFirstEmail(false);
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
            { firstEmail && 
              <>
                <TextField 
                  id="standard-basic" 
                  label="Email" 
                  variant="standard"
                  placeholder="example@example.com"
                />
                <LoadingButton
                  margin="normal" 
                  onClick={handleOpenVerify}
                  // endIcon={<LoginIcon />}
                  loading={loading}
                  // loadingPosition="end"
                  variant="contained"
                >
                  <b>Send</b>
                </LoadingButton>
              </>
            }
            { !firstEmail && 
              <>
                <TextField
                  id="standard-basic" 
                  label="Old Password" 
                  variant="standard"
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
              </>
            }
            <div className='other-link'>
              <Link to="/">Remember Password?</Link>
            </div>
        </Stack>
      </Paper>

      {/* Verify Email */}
      <Dialog open={openVerify} onClose={handleCloseVerify}>
        <DialogTitle>Verify</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter verification code to verify...
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="verify"
            label="Code"
            type="text"
            fullWidth
            variant="standard"
            required
          />
        </DialogContent>
        <DialogActions>
          <Tooltip title={`Try agian after ${ verifyTimer } seconds`} placement="top" arrow>
            <Typography variant='h6' style={{cursor: 'default', userSelect: 'none'}}>{ verifyTimer }</Typography>
          </Tooltip>
          <Button onClick={handleCloseVerify}>Cancel</Button>
          <Button variant="contained" onClick={handleVerify}>Verify</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}
