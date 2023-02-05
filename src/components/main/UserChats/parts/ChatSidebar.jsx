import React, { useState } from 'react'

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import OutboxIcon from '@mui/icons-material/Outbox';
// import StarIcon from '@mui/icons-material/Star';
// import CreateIcon from '@mui/icons-material/Create';
// import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';

import '../../../../sass/chat-sidebar.scss'
// import { useDispatch } from 'react-redux';
import { Avatar, Badge, IconButton } from '@mui/material';
// import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import { ChatMessages } from './ChatMessages';

// const drawerWidth = 40;

export const ChatSidebar = () => {
    // const dispatch = useDispatch();
    const [pageName, setPageName] = useState('Chat');
    const [sortSelect, setSortSelect] = useState('default');
    const [selectedUser, setSelectedUser] = useState(false);

    // const handleSortChange = (e) => {
    //     setSortSelect(e.target.value)
    // }

    const handleSelectedUser = (e) => {
        console.log("handleSelectedUser: ", e);
        setSelectedUser(true)
    }

    // const handlePageChanges = (pageName) => {
    //     setPageName(pageName);
    // }

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { boxSizing: 'border-box' },
        }}
        className="chat-sidebar"
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
            <List>
                <ListItem selected={selectedUser} key='you' disablePadding onClick={handleSelectedUser}>
                <ListItemButton>
                    <ListItemIcon>
                        <Badge className="online-badge" color="success" variant="dot">
                            <Avatar alt="Sourabh Sen" src="/static/images/avatar/2.jpg" />
                        </Badge>
                    </ListItemIcon>
                    <ListItemText className="list-name" primary='Compose' />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem 
                    selected={selectedUser} 
                    key='chats1' 
                    disablePadding 
                    onClick={handleSelectedUser}
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                            <CallIcon />
                        </IconButton>
                    }
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <Badge className="online-badge" color="success" variant="dot">
                                <Avatar alt="Jack Smith" src="/static/images/avatar/2.jpg" />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText className="list-name" primary='Jack Smith'></ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem selected={selectedUser} key='chats2' disablePadding onClick={handleSelectedUser}
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                            <CallIcon />
                        </IconButton>
                    }
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <Badge className="online-badge" color="error" variant="dot">
                                <Avatar alt="Nicola Kidman" src="/static/images/avatar/3.jpg" />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText className="list-name" primary='Nicola Kidman' />
                    </ListItemButton>
                </ListItem>
                <ListItem selected={selectedUser} key='chats3' disablePadding onClick={handleSelectedUser}
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                            <CallIcon />
                        </IconButton>
                    }
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <Badge className="online-badge" color="success" variant="dot">
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText className="list-name" primary='Travis Howard' />
                    </ListItemButton>
                </ListItem>
                <ListItem key='chats4' disablePadding onClick={handleSelectedUser}
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                            <CallIcon />
                        </IconButton>
                    }
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <Badge className="online-badge" color="error" variant="dot">
                                <Avatar alt="Yaniv Pichoto" src="/static/images/avatar/3.jpg" />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText className="list-name" primary='Yaniv Pichoto' />
                    </ListItemButton>
                </ListItem>
                <ListItem key='chats5' disablePadding onClick={() => handleSelectedUser}
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                            <CallIcon />
                        </IconButton>
                    }
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <Badge className="online-badge" color="success" variant="dot">
                                <Avatar alt="Jarvis Harvard" src="/static/images/avatar/2.jpg" />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText className="list-name" primary='Jarvis Harvard' />
                    </ListItemButton>
                </ListItem>
                <ListItem key='chats6' disablePadding onClick={() => handleSelectedUser}
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                            <CallIcon />
                        </IconButton>
                    }
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <Badge className="online-badge" color="error" variant="dot">
                                <Avatar alt="Kavin Holmes" src="/static/images/avatar/3.jpg" />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText className="list-name" primary='Kavin Holmes' />
                    </ListItemButton>
                </ListItem>
                <ListItem key='chats7' disablePadding onClick={() => handleSelectedUser}
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                            <CallIcon />
                        </IconButton>
                    }
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <Badge className="online-badge" color="success" variant="dot">
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText className="list-name" primary='Travis Howard' />
                    </ListItemButton>
                </ListItem>
                <ListItem key='chats8' disablePadding onClick={() => handleSelectedUser}
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                            <CallIcon />
                        </IconButton>
                    }
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <Badge className="online-badge" color="error" variant="dot">
                                <Avatar alt="Yaniv Pichoto" src="/static/images/avatar/3.jpg" />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText className="list-name" primary='Yaniv Pichoto' />
                    </ListItemButton>
                </ListItem>
                <ListItem key='chats9' disablePadding onClick={() => handleSelectedUser}
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                            <CallIcon />
                        </IconButton>
                    }
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <Badge className="online-badge" color="success" variant="dot">
                                <Avatar alt="Jarvis Harvard" src="/static/images/avatar/2.jpg" />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText className="list-name" primary='Jarvis Harvard' />
                    </ListItemButton>
                </ListItem>
                <ListItem key='chats10' disablePadding onClick={() => handleSelectedUser}
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                            <CallIcon />
                        </IconButton>
                    }
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <Badge className="online-badge" color="error" variant="dot">
                                <Avatar alt="Kavin Holmes" src="/static/images/avatar/3.jpg" />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText className="list-name" primary='Kavin Holmes' />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* <Toolbar style={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" noWrap component="div">
                { pageName } Toolbar Options
            </Typography>
            <SortByAlphaIcon style={{ cursor: 'pointer' }} />
        </Toolbar> */}
        { pageName === 'Chat' && <ChatMessages badgeLabel={'New'} pageName={pageName}/>}
        </Box>
    </Box>
  );
}