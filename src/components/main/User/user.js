import React, { useState } from 'react';
//Routes
import {
  Link
} from "react-router-dom";
//UI
import { Avatar, Tooltip, Typography } from '@mui/material';
import Badge from '@mui/material/Badge';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
// import Divider from '@mui/material/Divider';
// import { deepOrange } from '@mui/material/colors';
//SCSS
import '../../../sass/main.scss';
import '../../../sass/user.scss';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export default function User() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('sourabh');
  const [openEmail, setOpenEmail] = useState(false);
  const [openVerify, setOpenVerify] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);

  //Password Visibility
  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
    handlePassword();
  }

  const handlePassword = () => {
    if(passwordVisible) {
      return password;
    }
    return '••••••••';
  }

  //Enter Email
  const handleClickOpenEmail = () => {
    setOpenEmail(true);
  };

  const handleCloseEmail = () => {
    setOpenEmail(false);
    setOpenVerify(false);
  };

  //Verify Email
  const handleClickToVerifyOpen = () => {
    console.log("Verification code sent.")
    setOpenVerify(true);
  }

  const handleClickToVerifyClose = () => {
    console.log("Verification done.")
    setOpenVerify(false);
    setOpenEmail(false);
  }

  //Change Password
  const handleChangePassword = () => {
    console.log("Change password done.");
    setOpenPassword(false);
  }

  const handleClickOpenPassword = () => {
    setOpenPassword(true);
  };

  const handleClosePassword = () => {
    setOpenPassword(false);
  };

  //About
  const handleClickOpenAbout = () => {
    setOpenAbout(true);
  };

  const handleCloseAbout = () => {
    setOpenAbout(false);
  };

  return (
    <div className='ilqna-main'>
      <div className="user">

        {/* Profile */}
        <div className='user-image'>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            {/* <Avatar {...stringAvatar('Kent Dodds')} /> */}
            <Avatar sx={{ bgcolor: '#1976d2' }} className="avatar-img" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </StyledBadge>
        </div>
          <Grid className="ask-section" container spacing={2} columns={12}>
            <Grid item xs={6}>
              <Item className="ask-section-count sections">37<span className="ask-section-text">ASKs</span></Item>
            </Grid>
            <Grid item xs={6}>
              <Item className="ask-section-count sections">22<span className="ask-section-text">ANSWERs</span></Item>
            </Grid>
          </Grid>

          {/* User */}
          <Grid className="ask-section-content" container spacing={2} columns={12}>
            <Grid item xs={6}>
              <Item className='sections'><span className='user-email'>sourabhsen201313@gmail.com</span> 
                <Tooltip title="Edit Email" placement="top" arrow>
                  <EditIcon 
                    onClick={handleClickOpenEmail}
                    className='user-icon' 
                  />
                </Tooltip>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item className='sections'><span className='user-email'>{ handlePassword() }</span>
                { !passwordVisible ? 
                  <Tooltip title="Show Password" placement="top" arrow>
                    <VisibilityOffIcon 
                      className='user-icon' 
                      onClick={handlePasswordVisibility} 
                    />
                  </Tooltip> 
                  : 
                  <Tooltip title="Hide Password" placement="top" arrow>
                    <VisibilityIcon 
                      className='user-icon' 
                      onClick={handlePasswordVisibility} 
                    />
                  </Tooltip> 
                } 
                <Tooltip title="Change Password" placement="top" arrow>
                  <EditIcon 
                    onClick={handleClickOpenPassword}
                    className='user-icon'
                  />
                </Tooltip>
              </Item>
            </Grid>
          </Grid>

            {/* About */}
          <Grid className="ask-section-content" container spacing={2} columns={12}>
            <Grid item xs={6}>
              <Item className='sections'><span className='user-email'>About</span>
                <Tooltip title="About" placement="top" arrow>
                  <Typography 
                    onClick={handleClickOpenAbout}
                    className='user-icon'
                  >V1.0.0</Typography>
                </Tooltip>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item className='sections'><span className='user-email'>Logout</span>
                <Tooltip title="Logout" placement="top" arrow>
                  <Link className='user-icon logout-icon' to="/">
                    <ExitToAppIcon />
                  </Link>
                </Tooltip>  
              </Item>
            </Grid>
          </Grid>

          {/* Change Email */}
          <Dialog open={openEmail} onClose={handleCloseEmail}>
            <DialogTitle>Email</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You will recieve a verification code at entered email...
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
                required
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEmail}>Cancel</Button>
              <Button onClick={handleClickToVerifyOpen}>Send</Button>
            </DialogActions>
          </Dialog>
          
          {/* Verify Email */}
          <Dialog open={openVerify} onClose={handleCloseEmail}>
            <DialogTitle>Verify</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter verification code to verify...
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Code"
                type="text"
                fullWidth
                variant="standard"
                required
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEmail}>Cancel</Button>
              <Button onClick={handleClickToVerifyClose}>Verify</Button>
            </DialogActions>
          </Dialog>
          
          {/* Change Password */}
          <Dialog open={openPassword} onClose={handleClosePassword}>
            <DialogTitle>Change Password</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You have to login again after changing your password...
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="password"
                label="Current Password"
                type="password"
                fullWidth
                variant="standard"
                required
              />
              <TextField
                margin="dense"
                id="newpassword"
                label="New Password"
                type="password"
                fullWidth
                variant="standard"
                required
              />
              <TextField
                margin="dense"
                id="cnewpassword"
                label="Confirm New Password"
                type="password"
                fullWidth
                variant="standard"
                required
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosePassword}>Cancel</Button>
              <Button onClick={handleChangePassword}>Change</Button>
            </DialogActions>
          </Dialog>
           
          {/* About */}
          <Dialog open={openAbout} onClose={handleCloseAbout}>
            <DialogTitle>ILQNA <span className='version-info'>V1.0.0</span></DialogTitle>
            <DialogContent>
              <DialogContentText>
                <SelfImprovementIcon className='about-icon' />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAbout}>Close</Button>
            </DialogActions>
          </Dialog>
      </div>
    </div>
  )
}
