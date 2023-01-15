import React, { useState } from 'react'

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import OutboxIcon from '@mui/icons-material/Outbox';
import StarIcon from '@mui/icons-material/Star';
import CreateIcon from '@mui/icons-material/Create';

import '../../../../sass/inbox-sidebar.scss'
import { InboxMessages } from './InboxMessages';
import { useDispatch } from 'react-redux';
import { openComposeMessage, setDiscardLoading, setDraftLoading, setSendLoading } from '../../../../redux/dialogRedux/compose-message-slice';
import { MenuItem, Select } from '@mui/material';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';

// const drawerWidth = 40;

export const InboxSidebar = () => {
    const dispatch = useDispatch();
    const [pageName, setPageName] = useState('Inbox')
    const [sortSelect, setSortSelect] = useState('default');

    const handleSortChange = (e) => {
        setSortSelect(e.target.value)
    }

    const handleComposeMessage = () => {
        dispatch(setDiscardLoading(false));
        dispatch(setDraftLoading(false));
        dispatch(setSendLoading(false));
        dispatch(openComposeMessage(true));
    }

    const handlePageChanges = (pageName) => {
        setPageName(pageName);
    }

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { boxSizing: 'border-box' },
        }}
        className="inbox-sidebar"
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
            <List>
                <ListItem key='compose' disablePadding onClick={handleComposeMessage}>
                <ListItemButton>
                    <ListItemIcon>
                        <CreateIcon />
                    </ListItemIcon>
                    <ListItemText className="list-name" primary='Compose' />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem key='inbox' disablePadding onClick={() => handlePageChanges('Inbox')}>
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText className="list-name" primary='Inbox' />
                    </ListItemButton>
                </ListItem>
                <ListItem key='starred' disablePadding onClick={() => handlePageChanges('Starred')}>
                    <ListItemButton>
                        <ListItemIcon>
                            <StarIcon />
                        </ListItemIcon>
                        <ListItemText className="list-name" primary='Starred' />
                    </ListItemButton>
                </ListItem>
                <ListItem key='sent' disablePadding onClick={() => handlePageChanges('Sent')}>
                    <ListItemButton>
                        <ListItemIcon>
                            <OutboxIcon />
                        </ListItemIcon>
                        <ListItemText className="list-name" primary='Sent' />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar style={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" noWrap component="div">
                { pageName } Toolbar Options
            </Typography>
            <SortByAlphaIcon style={{ cursor: 'pointer' }} />
            </Toolbar>
            { pageName === 'Inbox' && <InboxMessages badgeLabel={'New'} pageName={pageName}/>}
            { pageName === 'Starred' && <InboxMessages badgeLabel={'New'} pageName={pageName}/>}
            { pageName === 'Sent' && <InboxMessages badgeLabel={'Today'} pageName={pageName}/>}
        </Box>
    </Box>
  );
}