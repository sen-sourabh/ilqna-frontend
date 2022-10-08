import React, { Fragment, useState} from 'react';
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

const filterPage = ['/', '/user-questions', '/user-bookmark', '/notification'];

// HEADER
export default function Header() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    left: false
  });
  const [openFilter, setOpenFilter] = useState(false);
  const [category, setCategory] = useState('EUR');
  const [language, setLanguage] = useState('EUR');

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  }

  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
  }


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ left: open });
  };

  const handleClickOpenFilter = () => {
    if(filterPage.includes(window.location.pathname)) {
      setOpenFilter(true);
    }
    return;
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleClickLogout = () => {
    dispatch(isLogout(false));
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
          <Typography variant="h2" class="drawer-title" sx={{ flexGrow: 1 }}>
            ilqna
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
          <Divider />
        </Box>
      </Drawer>


      {/* Filter Dailog */}
      <Dialog 
          open={openFilter}
          onClose={handleCloseFilter}
        >
          <DialogTitle>Filter</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Filter will be applied for current page...
            </DialogContentText>
            <TextField 
              id="standard-basic" 
              label="Seacrh..." 
              variant="standard"
              fullWidth
              className='filter-field'
            />
            <TextField
              fullWidth
              id="select-category"
              select
              label="Category"
              value={category}
              onChange={handleChangeCategory}
              variant="standard"
              className='filter-field'
              required
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              className='filter-field'
              id="select-language"
              select
              label="Language"
              value={language}
              onChange={handleChangeLanguage}
              variant="standard"
            >
              {languages.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseFilter}>Cancel</Button>
            <Button variant="contained" onClick={handleCloseFilter}>Apply</Button>
          </DialogActions>
        </Dialog>
    </Fragment>
  )
}
