import React, { Fragment, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Drawer, AppBar, Toolbar, Typography, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Badge, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import '../../sass/header.scss';
import PasswordIcon from '@mui/icons-material/Password';
import InfoIcon from '@mui/icons-material/Info';
import { isLogout } from '../../redux/loginRedux/login-slice';
import { useDispatch } from 'react-redux';
import { prepareSnackbar, resetSnackbar } from '../../redux/snackbarRedux/snackbar-slice';
import * as functions from '../../functions/common/common';
import { openFilter } from '../../redux/dialogRedux/filter-slice';
import { openChangePassword } from '../../redux/dialogRedux/change-password';
import { openAbout } from '../../redux/dialogRedux/about-slice';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PhoneIcon from '@mui/icons-material/Phone';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ChatIcon from '@mui/icons-material/Chat';
import LoginIcon from '@mui/icons-material/Login';
import { RightMenu } from './parts/RightMenu';

const filterPage = ['/', '/user-questions', '/user-bookmark', '/notification'];

// HEADER
export default function Header() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    left: false
  });
  const authPages = ['/login', '/register', '/forgot-password'];

  useEffect(() => {
    // initComponent();
  })

  const initComponent = () => {
    // if(localStorage.getItem('isLogin')) {
    //   if(window.location.pathname === '/'){
    //     navigate('/home');
    //   }
    // } else {
      // navigate('/')
    // }
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (authPages.includes(window.location.pathname) || (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift'))) {
      return;
    }
    setState({ left: open });
  };

  const handleClickOpenFilter = () => {
    if(filterPage.includes(window.location.pathname)) {
      dispatch(openFilter(true))
    }
  };

  const handleOpenChangePassword = () => {
    dispatch(openChangePassword(true));
  };

  const handleClickOpenAbout = () => {
    dispatch(openAbout(true));
  };

  const handleClickLogout = () => {
    dispatch(prepareSnackbar({ open: true, severity: 'success', message: 'Logout successfully.' }));
    setTimeout(() => { dispatch(resetSnackbar()) }, functions.snackbarTimer)
    dispatch(isLogout(false));
    navigate('/');
    functions.goingForLogout();
  };

  const handleClickLogin = () => {
    navigate('/login');
    functions.goingForLogout();
  }

  const handleLogoClick = () => {
    navigate('/')
  }

  return (
    <Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography  
            style={{cursor: 'pointer'}}
            variant="h6" 
            component="div" 
            sx={{ flexGrow: 1 }} 
            onClick={() => {handleLogoClick()}}
          >
            ILQNA
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          <Box sx={{ flexGrow: 1 }} />
          <RightMenu />
        </Toolbar>
      </AppBar>
      <Drawer
        anchor='left'
        open={state['left']}
        onClose={toggleDrawer('left', false)}
      >
        <Box
          className='drawer-content'
          role="presentation"
          onClick={toggleDrawer('left', false)}
          onKeyDown={toggleDrawer('left', false)}
        >
          <Typography className='drawer-title' sx={{ flexGrow: 1 }}>
            ILQNA
          </Typography>
          <List>
            <ListItem key='filter' disablePadding onClick={handleClickOpenFilter}>
              <ListItemButton>
                <ListItemIcon>
                  <FilterListIcon />
                </ListItemIcon>
                <ListItemText primary='Filter' className='drawer-option' />
              </ListItemButton>
            </ListItem>
            {
              localStorage.getItem('isLogin') && 
                <ListItem key='change-password' disablePadding onClick={handleOpenChangePassword}>
                  <ListItemButton>
                    <ListItemIcon>
                      <PasswordIcon />
                    </ListItemIcon>
                    <ListItemText primary='Change Password' className='drawer-option' />
                  </ListItemButton>
                </ListItem>
            }
            <ListItem key='about' disablePadding onClick={handleClickOpenAbout}>
              <ListItemButton>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary='About' className='drawer-option' />
              </ListItemButton>
            </ListItem>
            {
              localStorage.getItem('isLogin') ?
                <ListItem key='logout' disablePadding onClick={handleClickLogout}>
                  <ListItemButton>
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary='Logout' className='drawer-option' />
                  </ListItemButton>
                </ListItem>
              :
                <ListItem key='login' disablePadding onClick={handleClickLogin}>
                  <ListItemButton>
                    <ListItemIcon>
                      <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary='Login' className='drawer-option' />
                  </ListItemButton>
                </ListItem>
            }
          </List>
        </Box>
      </Drawer>
    </Fragment>
  )
}
