import React, { Fragment, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Toolbar, Typography, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import '../../sass/header.scss';
import Drawer from '@mui/material/Drawer';
import { Button, MenuItem, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { isLogout } from '../../redux/loginRedux/login-slice';
import { useDispatch } from 'react-redux';
import { prepareSnackbar, resetSnackbar } from '../../redux/snackbarRedux/snackbar-slice';
import * as functions from '../../functions/common/common';
import { openFilter } from '../../redux/dialogRedux/filter-slice';


const categories = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

const languages = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

const filterPage = ['/home', '/user-questions', '/user-bookmark', '/notification'];

// HEADER
export default function Header() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    left: false
  });

  useEffect(() => {
    if(localStorage.getItem('isLogin')) {
      if(window.location.pathname === '/'){
        navigate('/home');
      }
    } else {
      navigate('/')
    }
  }, [])


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ left: open });
  };

  const handleClickOpenFilter = () => {
    if(filterPage.includes(window.location.pathname)) {
      dispatch(openFilter(true))
    }
  };

  const handleClickLogout = () => {
    dispatch(prepareSnackbar({ open: true, severity: 'success', message: 'Logout successfully.' }));
    setTimeout(() => { dispatch(resetSnackbar()) }, functions.snackbarTimer)
    dispatch(isLogout(false));
    navigate('/');
    functions.goingForLogout();
  };

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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ilqna
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
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
          <Typography variant="h2" className="drawer-title" sx={{ flexGrow: 1 }}>
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
            <ListItem key='logout' disablePadding onClick={handleClickLogout}>
              <ListItemButton>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary='Logout' className='drawer-option' />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Fragment>
  )
}
