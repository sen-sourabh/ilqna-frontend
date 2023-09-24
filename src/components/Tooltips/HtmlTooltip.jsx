import { Avatar, Badge, Typography } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { capitalizeFirstLetter, generateRandomColor } from '../../functions/common/common';
import '../../sass/qna.scss';

export const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    width: '100%',
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '2px solid #dadde9',
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '50%',
      height: '50%',
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

export const TooltipProfileCard = ({ userData }) => {
  return (
    <div className="qna-user-data">
      <div className="qna-user-image">
        <StyledBadge
          className="user-image-status"
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar className="qna-user-image" sx={{ bgcolor: generateRandomColor() }}>
            {userData?.username[0]?.toUpperCase()}
          </Avatar>
        </StyledBadge>
      </div>
      <div className="qna-user-info">
        <Typography variant="subtitle2">
          <b>{userData?.username}</b>
        </Typography>
        <Typography variant="caption">{capitalizeFirstLetter(userData?.designation)}</Typography>
      </div>
    </div>
  );
};
