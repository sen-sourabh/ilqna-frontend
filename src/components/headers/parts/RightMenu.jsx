import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
  Box,
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PhoneIcon from '@mui/icons-material/Phone';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ChatIcon from '@mui/icons-material/Chat';

export const RightMenu = () => {
  return (
    <>
      {localStorage.getItem('isLogin') ? (
        <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <Link className="header-icon" to="/user-call-request">
              <Badge badgeContent={2} color="error">
                <PhoneIcon />
              </Badge>
            </Link>
          </IconButton>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <Link className="header-icon" to="/user-chats">
              <Badge badgeContent={8} color="error">
                <ChatIcon />
              </Badge>
            </Link>
          </IconButton>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <Link className="header-icon" to="/user-inbox">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </Link>
          </IconButton>
          <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
            <Link className="header-icon" to="/user-notification">
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </Link>
          </IconButton>
          <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
            <Link className="header-icon" to="/user-bookmark">
              <BookmarkIcon />
            </Link>
          </IconButton>
        </Box>
      ) : null}
    </>
  );
};
