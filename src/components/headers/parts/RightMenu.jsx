import AddBoxIcon from '@mui/icons-material/AddBox';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Badge, Box, IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export const RightMenu = () => {
  return (
    <>
      {localStorage.getItem('isLogin') ? (
        <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
          <Tooltip title="Home" color={'black'} arrow placement={'bottom'} autoCapitalize={'true'}>
            <IconButton sx={{ mr: 2 }} aria-label="Home" color="inherit">
              <Link className="header-icon" to="/">
                <Badge color="primary">
                  <HomeIcon className="icon-size" />
                </Badge>
              </Link>
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Your Questions"
            color={'black'}
            arrow
            placement={'bottom'}
            autoCapitalize={'true'}
          >
            <IconButton sx={{ mr: 2 }} aria-label="Your Questions" color="inherit">
              <Link className="header-icon" to="/user-questions">
                <Badge color="primary">
                  <QuestionAnswerIcon className="icon-size" />
                </Badge>
              </Link>
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Ask Questions"
            color={'black'}
            arrow
            placement={'bottom'}
            autoCapitalize={'true'}
          >
            <IconButton sx={{ mr: 2 }} aria-label="Ask Questions" color="inherit">
              <Link className="header-icon" to="/add-question">
                <Badge color="primary">
                  <AddBoxIcon className="icon-size" />
                </Badge>
              </Link>
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Account"
            color={'black'}
            arrow
            placement={'bottom'}
            autoCapitalize={'true'}
          >
            <IconButton sx={{ mr: 2 }} aria-label="Account" color="inherit">
              <Link className="header-icon" to="/user">
                <Badge badgeContent={17} color="primary">
                  <PersonIcon className="icon-size" />
                </Badge>
              </Link>
            </IconButton>
          </Tooltip>
          {/* <Tooltip
            title="Call Requests"
            color={'black'}
            arrow
            placement={'bottom'}
            autoCapitalize={'true'}
          >
            <IconButton sx={{ mr: 2 }} aria-label="show 4 new mails" color="inherit">
              <Link className="header-icon" to="/user-call-request">
                <Badge badgeContent={2} color="primary">
                  <PhoneIcon className="icon-size" />
                </Badge>
              </Link>
            </IconButton>
          </Tooltip>
          <Tooltip title="Chats" color={'black'} arrow placement={'bottom'} autoCapitalize={'true'}>
            <IconButton sx={{ mr: 2 }} aria-label="show 4 new mails" color="inherit">
              <Link className="header-icon" to="/user-chats">
                <Badge badgeContent={8} color="primary">
                  <ChatIcon className="icon-size" />
                </Badge>
              </Link>
            </IconButton>
          </Tooltip>
          <Tooltip title="Inbox" color={'black'} arrow placement={'bottom'} autoCapitalize={'true'}>
            <IconButton sx={{ mr: 2 }} aria-label="show 4 new mails" color="inherit">
              <Link className="header-icon" to="/user-inbox">
                <Badge badgeContent={4} color="primary">
                  <MailIcon className="icon-size" />
                </Badge>
              </Link>
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Notifications"
            color={'black'}
            arrow
            placement={'bottom'}
            autoCapitalize={'true'}
          >
            <IconButton sx={{ mr: 2 }} aria-label="show 17 new notifications" color="inherit">
              <Link className="header-icon" to="/user-notification">
                <Badge badgeContent={17} color="primary">
                  <NotificationsIcon className="icon-size" />
                </Badge>
              </Link>
            </IconButton>
          </Tooltip> */}
          <Tooltip
            title="Bookmarks"
            color={'black'}
            arrow
            placement={'bottom'}
            autoCapitalize={'true'}
          >
            <IconButton sx={{ mr: 2 }} aria-label="show 17 new notifications" color="inherit">
              <Link className="header-icon" to="/user-bookmark">
                <BookmarkIcon className="icon-size" />
              </Link>
            </IconButton>
          </Tooltip>
        </Box>
      ) : null}
    </>
  );
};
