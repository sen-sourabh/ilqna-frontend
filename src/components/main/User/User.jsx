import React, { useEffect, useRef, useState } from 'react';
//Routes
import {
  Link
} from "react-router-dom";
//UI
import { Avatar, Tooltip, Typography } from '@mui/material';
import Badge from '@mui/material/Badge';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationSound from "../../../images/Notification_sound.wav";

//SCSS
import '../../../sass/user.scss';

import * as functions from '../../../functions/common/common';
import { getAllQuestionsCountOfUser } from '../../../functions/APIs/question-api';
import { useDispatch, useSelector } from 'react-redux';
import { openUsername } from '../../../redux/dialogRedux/update-username-slice';
import { getAllAnswersCountOfUser } from '../../../functions/APIs/answer-api';


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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export default function User() {
  const dispatch = useDispatch();
  //UI Variables
  const [questionCount, setQuestionCount] = useState(0);
  const [answerCount, setAnswerCount] = useState(0);
  const audioPlayer = useRef(null);
  const { _id, username, designation, company } = useSelector(state => state.login?.userData)

  useEffect(() => {
    getAllQuestionsByUserId();
    getAllAnswersByUserId();
  });

  //Enter Username
  const handleOpenUsername = () => {
    dispatch(openUsername(true));
  };

  const getAllQuestionsByUserId = async  () => {
    const result = await getAllQuestionsCountOfUser({_id});
    setQuestionCount(result.totalCount);
  }

  const getAllAnswersByUserId = async  () => {
    const result = await getAllAnswersCountOfUser({_id});
    setAnswerCount(result.totalCount);
  }


  return (
    <div className='ilqna-main'>
      <div className="user">
        <div className='user-image'>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar sx={{ bgcolor: '#1976d2' }} className="avatar-img" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </StyledBadge>
          
        </div>
          <Typography 
            className="user-title"
          >
            { functions.capitalizeFirstLetter(username) }
            <Tooltip title="Change Username" placement="right" arrow>
              <EditIcon
                className='user-title-icon'
                onClick={handleOpenUsername}
              />
            </Tooltip>
          </Typography>
          <Typography
            className='caption-text'
          >
            {designation}, {company}
          </Typography>
          <Grid className="ask-section" container spacing={1} columns={12}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Item className="ask-section-count sections">{ answerCount ? answerCount : 0 }<span className="ask-section-text">ANSWERs</span></Item>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Item className="ask-section-count sections">{ questionCount ? questionCount : 0 }<span className="ask-section-text">ASKs</span></Item>
            </Grid>
          </Grid>
          <Grid className="ask-section-content" container spacing={1} columns={12}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Item className='sections'><span className='user-email'>Bookmarks</span>
                <Tooltip title="Bookmarks" placement="top" arrow>
                  <Link className='user-icon' to="/user-bookmark">
                    <BookmarkIcon />
                  </Link>
                </Tooltip>
              </Item>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Item className='sections'><span className='user-email'>Notifications</span>
                <Tooltip title="Notifications" placement="top" arrow>
                  <Link className='user-icon' to="/notification">
                    <Badge color="error" className='noti-icon' variant="dot">
                      <NotificationsIcon />
                      <audio ref={audioPlayer} src={NotificationSound} />
                    </Badge>
                  </Link>
                </Tooltip>
              </Item>
            </Grid>
          </Grid>
      </div>
    </div>
  )
}
