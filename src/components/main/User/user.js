import React from 'react';
//UI
import { Avatar } from '@mui/material';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { deepOrange } from '@mui/material/colors';
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

export default function User() {
  return (
    <div className='ilqna-main'>
      <div className="user">
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
      </div>
    </div>
  )
}
