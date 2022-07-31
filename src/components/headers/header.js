import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
// import SettingsIcon from '@mui/icons-material/Settings';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Tooltip from '@mui/material/Tooltip';
import '../../sass/header.scss';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: 0,
  width: '70%',
  [theme.breakpoints.up('sm')]: {
    // marginLeft: theme.spacing(1),
    marginRight: 0,
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '90%',
    [theme.breakpoints.up('sm')]: {
      width: '50ch',
      '&:focus': {
        width: '55ch',
      },
    },
  },
}));

// HEADER
export default function Header() {
  return (
    <div className='header'>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <div className='logo'>
              <Tooltip title="QnA" placement="bottom" arrow>
                <QuestionAnswerIcon />
              </Tooltip>
            </div>
            <div className='seachfield'>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </div>
            <div className='filter'>
              <Tooltip title="Filter" placement="bottom" arrow>
                <FilterAltIcon />
                {/* <SettingsIcon /> */}
              </Tooltip>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}
