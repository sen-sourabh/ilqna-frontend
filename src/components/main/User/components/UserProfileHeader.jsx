import React, { useEffect, useState } from 'react';
//UI
import Badge from '@mui/material/Badge';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

//SCSS
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAnswersCountOfUser } from '../../../../functions/APIs/answer-api';
import { getAllQuestionsCountOfUser } from '../../../../functions/APIs/question-api';
import { openUsername } from '../../../../redux/dialogRedux/update-username-slice';
import '../../../../sass/user.scss';
import Loader from '../../../Loaders/loader';

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

export const UserProfileHeader = () => {
  const dispatch = useDispatch();
  //UI Variables
  const [questionCount, setQuestionCount] = useState(0);
  const [answerCount, setAnswerCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { _id, username, designation, company, image } = useSelector(
    (state) => state.login?.userData,
  );

  useEffect(() => {
    getAllQuestionsByUserId();
    getAllAnswersByUserId();
    setIsLoading(false);
  }, []);

  //Enter Username
  const handleOpenUsername = () => {
    dispatch(openUsername(true));
  };

  const getAllQuestionsByUserId = async () => {
    const result = await getAllQuestionsCountOfUser(_id);
    setQuestionCount(result.totalCount);
  };

  const getAllAnswersByUserId = async () => {
    const result = await getAllAnswersCountOfUser(_id);
    setAnswerCount(result.totalCount);
  };

  return (
    <div className="ilqna-main">
      {isLoading && <Loader />}
      <div className="user">
        <div className="user-header">
          <div className="user-image">
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar
                sx={{ bgcolor: '#1976d2' }}
                className="avatar-img"
                alt={username}
                src={image}
              />
            </StyledBadge>
          </div>
          <Typography className="user-title" variant="h6">
            {username}
            <EditIcon className="user-title-icon" onClick={handleOpenUsername} />
          </Typography>
          <Typography className="caption-text" variant="subtitle1">
            {designation ? designation + ', ' + company : company ? company : ''}
          </Typography>
        </div>
        <Grid className="ask-section" container spacing={1} columns={12}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Item className="ask-section-count sections">
              {answerCount ? answerCount : 0}
              <span className="ask-section-text">ANSWERs</span>
            </Item>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Item className="ask-section-count sections">
              {questionCount ? questionCount : 0}
              <span className="ask-section-text">ASKs</span>
            </Item>
          </Grid>
        </Grid>
      </div>
      {/* <Divider variant="middle" /> */}
    </div>
  );
};
