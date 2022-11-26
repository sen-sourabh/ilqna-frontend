import React, { useState, useRef, useEffect } from 'react';
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
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationSound from "../../../images/Notification_sound.wav";
import InfoIcon from '@mui/icons-material/Info';
// import Divider from '@mui/material/Divider';
// import { deepOrange } from '@mui/material/colors';
//SCSS
import '../../../sass/main.scss';
import '../../../sass/user.scss';

import * as functions from '../../../functions/common/common';
import { useDispatch, useSelector } from 'react-redux';
import { isLogin, isLogout } from '../../../redux/loginRedux/login-slice';
import { prepareSnackbar, resetSnackbar } from '../../../redux/snackbarRedux/snackbar-slice';
import { openUsername } from '../../../redux/dialogRedux/update-username-slice';


//Component
import { Messages } from '../../Alerts/Messages';


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
  const dispatch = useDispatch();
  //UI Variables
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('sourabh');
  // const [openUsername, setOpenUsername] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [openVerify, setOpenVerify] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [newNotification, setNewNotification] = useState(true);
  const audioPlayer = useRef(null);
  const [verifyTimer, setVerifyTimer] = useState(null);
  const [openPopup, setOpenPopup] = useState('');
  //Operational Variables
  // const [username, setUsername] = useState('');
  // const [designation, setDesignation] = useState('');
  // const [company, setCompany] = useState('');
  const { username, designation, company } = useSelector(state => state.login?.userData)
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [cnewPassword, setCNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  //Validation Variables
  const [options, setOptions] = useState(null);
  const [showMessage, setShowMessage] = useState(false);


  //Password Visibility
  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
    handlePassword();
  }

  const handlePassword = () => {
    if(passwordVisible) {
      playAudio();
      return password;
    }
    return '••••••••';
  }

  //Enter Username
  const handleClickOpenUsername = () => {
    // setOpenPopup('Username');
    // setOpenUsername(true);
    dispatch(openUsername(true));
  };

  const handleCloseUsername = () => {
    // setOpenUsername(false);
    // setUsername('');
    setOpenPopup('');
  };

  const handleUsername = (event) => {
    // setUsername(event.target.value.trim())
  }

  const handleDesignation = (event) => {
    // setDesignation(event.target.value.trim())
  }

  const handleCompany = (event) => {
    // setCompany(event.target.value.trim())
  }

  //Enter Email
  const handleClickOpenEmail = () => {
    setOpenPopup('Email');
    setOpenEmail(true);
  };

  const handleCloseEmail = () => {
    setOpenEmail(false);
    handleClickToVerifyClose();
    setOpenPopup('');
  };

  //Verify Email
  const handleClickToVerifyOpen = () => {
    if(checkPopupValidation()) {
      setOpenPopup('Verify');
      console.log("Verification code sent.")
      setOpenVerify(true);
      setVerifyTimer(60);  
    }
  }

  const checkPopupValidation = () => {
    console.log(typeof username, username, openPopup);
    if(openPopup === 'Username' && username == '') {
      console.log("opopopo")
      setOptions({open: true, severity: 'error', message: `Please enter ${openPopup}`});
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      return false;
    } else if(openPopup === 'Email' && email == '') {
      setOptions({open: true, severity: 'error', message: `Please enter ${openPopup}`});
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      return false;
    } else if(openPopup === 'Password' && oldPassword == '') {
      setOptions({open: true, severity: 'error', message: `Please enter ${openPopup}`});
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      return false;
    } else { 
      return true; 
    }
    //  else if(openPopup === 'Email' && !email && email === '') {
    // } else if(openPopup === 'Password' && !oldPassword && oldPassword === '') {
    // }
  }

  useEffect(() => {
    const timer = verifyTimer > 0 ? setInterval(() => setVerifyTimer(verifyTimer - 1), 1000) : handleClickToVerifyClose()
    return () => clearInterval(timer);
  }, [verifyTimer]);

  const handleClickToVerifyClose = () => {
    console.log("Verification done.")
    setOpenVerify(false);
    setOpenEmail(false);
    // setOpenUsername(false);
    handleCloseUsername();
    setOpenPopup('');
  }

  //Change Password
  const handleChangePassword = () => {
    setOpenPopup('password');
    console.log("Change password done.");
    setOpenPassword(false);
  }

  const handleClickOpenPassword = () => {
    setOpenPopup('Password');
    setOpenPassword(true);
  };

  const handleClosePassword = () => {
    setOpenPassword(false);
    setOpenPopup('');
  };

  //About
  const handleClickOpenAbout = () => {
    setOpenAbout(true);
  };

  const handleCloseAbout = () => {
    setOpenAbout(false);
  };

  const playAudio = () => {
    audioPlayer.current.play();
  }

  const handleClickLogout = () => {
    dispatch(prepareSnackbar({ open: true, severity: 'success', message: 'Logout successfully.' }));
    setTimeout(() => { dispatch(resetSnackbar()) }, functions.snackbarTimer)
    dispatch(isLogout(false));
  }

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
          <Typography 
            className="user-title"
          >
            {username}
            <Tooltip title="Change Username" placement="right" arrow>
              <EditIcon
                className='user-title-icon'
                onClick={handleClickOpenUsername}
              />
            </Tooltip>
          </Typography>
          <Typography
            className='caption-text'
          >
            {designation}, {company}
          </Typography>
          <Grid className="ask-section" container spacing={1} columns={12}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Item className="ask-section-count sections">22<span className="ask-section-text">ANSWERs</span></Item>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Item className="ask-section-count sections">37<span className="ask-section-text">ASKs</span></Item>
            </Grid>
          </Grid>

          {/* User */}
          <Grid className="ask-section-content" container spacing={1} columns={12}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Item className='sections'><span className='user-email'>sourabhsen201313@gmail.com</span> 
                <Tooltip title="Change Email" placement="top" arrow>
                  <EditIcon 
                    onClick={handleClickOpenEmail}
                    className='user-icon' 
                  />
                </Tooltip>
              </Item>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
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

          {/* Options */}
          <Grid className="ask-section-content" container spacing={1} columns={12}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Item className='sections'><span className='user-email'>Bookmarks</span>
                <Tooltip title="Bookmarks" placement="top" arrow>
                  <Link className='user-icon' to="/user-bookmark">
                    <BookmarkIcon />
                  </Link>
                </Tooltip>
              </Item>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Item className='sections'><span className='user-email'>Notifications</span>
                <Tooltip title="Notifications" placement="top" arrow>
                  <Link className='user-icon' to="/notification">
                    {
                      newNotification ? 
                        <Badge color="error" className='noti-icon' variant="dot">
                          <NotificationsIcon />
                          <audio ref={audioPlayer} src={NotificationSound} />
                        </Badge>
                        :
                        <NotificationsIcon />
                    }
                  </Link>
                </Tooltip>
              </Item>
            </Grid>
          </Grid>

          {/* About */}
          <Grid className="ask-section-content" container spacing={1} columns={12}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Item className='sections'><span className='user-email'>About</span>
                <Tooltip title="About" placement="top" arrow>
                  <Typography 
                    onClick={handleClickOpenAbout}
                    className='user-icon'
                  >V1.0.0</Typography>
                </Tooltip>
              </Item>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Item className='sections'><span className='user-email'>Logout</span>
                <Tooltip title="Logout" placement="top" arrow>
                  <Link className='user-icon logout-icon' to="/">
                    <ExitToAppIcon onClick={handleClickLogout} />
                  </Link>
                </Tooltip>  
              </Item>
            </Grid>
          </Grid>

          {/* Change Username */}
          {/* <Dialog open={openUsername} onClose={handleCloseUsername}>
            <DialogTitle>Username</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You will recieve a verification code at registered email...
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                onChange={handleUsername}
                label="Username"
                type="text"
                fullWidth
                variant="standard"
                required
              />
              <TextField
                autoFocus
                margin="dense"
                onChange={handleDesignation}
                label="Designation"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                onChange={handleCompany}
                label="Company"
                type="text"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseUsername}>Cancel</Button>
              <Button variant="contained" onClick={handleClickToVerifyOpen}>Send</Button>
            </DialogActions>
          </Dialog> */}

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
              <Button variant="contained" onClick={handleClickToVerifyOpen}>Send</Button>
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
              <Button onClick={handleCloseEmail}>Cancel</Button>
              <Button variant="contained" onClick={handleClickToVerifyClose}>Verify</Button>
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
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••"
                fullWidth
                variant="standard"
                required
              />
              <TextField
                margin="dense"
                id="newpassword"
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••"
                fullWidth
                variant="standard"
                required
              />
              <TextField
                margin="dense"
                id="cnewpassword"
                label="Confirm New Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••"
                fullWidth
                variant="standard"
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
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosePassword}>Cancel</Button>
              <Button variant="contained" onClick={handleChangePassword}>Change</Button>
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
      {showMessage && <Messages options={options} />}
    </div>
  )
}
