import React, { useEffect, useState } from 'react';
//UI
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CommentIcon from '@mui/icons-material/Comment';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import TodayIcon from '@mui/icons-material/Today';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Avatar, Chip, Divider, Typography } from '@mui/material';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

//SCSS
import { LoadingButton } from '@mui/lab';
import '../../../sass/qna.scss';

//Common Functions
import { useDispatch, useSelector } from 'react-redux';
import {
  addAnswer,
  fetchAllAnswersByQuestionId,
  updateAnswer,
} from '../../../functions/APIs/answer-api';
import { updateBookmark } from '../../../functions/APIs/bookmark-api';
import { updateRating } from '../../../functions/APIs/rating-api';
import {
  capitalizeFirstLetter,
  checkIsBookmarkedByLoggedInUser,
  generateHTML,
  generateRandomColor,
  getPriorityColor,
  getStatusColor,
  isUserLooggedIn,
  removeTags,
  snackbarTimer,
} from '../../../functions/common/common';
import { setAnswerData } from '../../../redux/answerRedux/answer-slice';
import { prepareSnackbar, resetSnackbar } from '../../../redux/snackbarRedux/snackbar-slice';
import Loader from '../../Loaders/loader';
import { NeatEditor } from '../../NeatEditor/NeatEditor';
import { HtmlTooltip, TooltipProfileCard } from '../../Tooltips/HtmlTooltip';

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

export default function QNA(props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingAsk, setLoadingAsk] = useState(false);
  const { userData } = useSelector((state) => state.login);
  const { answerData } = useSelector((state) => state.answer);
  const [editorValue, setEditorValue] = useState('Add your answers here...');

  useEffect(() => {
    window.scrollTo(0, 0);
    initialize();
  }, []);

  const initialize = () => {
    if (answerData.length === 0) {
      if (localStorage.getItem('qna') && JSON.parse(localStorage.getItem('qna')).length) {
        let qna = JSON.parse(localStorage.getItem('qna'))[0];
        getQna(qna._id);
        // console.log(JSON.parse(localStorage.getItem('qna')));
      }
    }
    setIsLoading(false);
  };

  const getQna = async (_id) => {
    let body = {
      _id,
    };
    // if(userData?._id) {
    //     body = {...body, questionUserId: userData?._id}
    // }
    const response = await fetchAllAnswersByQuestionId(body);
    dispatch(setAnswerData(response.data));
  };

  const handleClickAsk = async (questionId) => {
    setLoadingAsk(true);
    let ans = document.getElementById('ilqna-editor');
    let answer =
      ans.innerHTML === 'Add your answers here...' || ans.innerHTML === '' ? '' : ans.innerHTML;
    if (!removeTags(answer)) {
      dispatch(prepareSnackbar({ open: true, severity: 'error', message: 'Answer is required.' }));
      setTimeout(() => {
        dispatch(resetSnackbar());
      }, snackbarTimer);
    } else {
      let body = {
        answer,
        questionId,
        answerUserId: JSON.parse(localStorage.getItem('userData'))._id,
        ipAddress: localStorage.getItem('ipLocationData')
          ? JSON.parse(localStorage.getItem('ipLocationData')).ipAddress
          : '',
        location: localStorage.getItem('ipLocationData')
          ? JSON.parse(localStorage.getItem('ipLocationData')).location
          : '',
      };
      const response = await addAnswer(body);
      if (response.code !== 200 && response.status !== 'OK') {
        dispatch(prepareSnackbar({ open: true, severity: 'error', message: response.message }));
        setTimeout(() => {
          dispatch(resetSnackbar());
        }, snackbarTimer);
      } else {
        dispatch(prepareSnackbar({ open: true, severity: 'success', message: response.message }));
        setTimeout(() => {
          dispatch(resetSnackbar());
        }, snackbarTimer);
        handleClearForm();
        getQna(questionId);
      }
    }
    setLoadingAsk(false);
  };

  const handleClearForm = () => {
    var desc = document.getElementById('ilqna-editor');
    desc.innerHTML = 'Add your answers here...';
  };

  const handleTrendingClick = async (questionId, answer, upRatingVal) => {
    if (isUserLooggedIn(userData)) {
      let body = {
        _id: answer._id,
        upRatingVal,
        upRating: upRatingVal ? Number(answer.upRating) + 1 : Number(answer.upRating),
        downRating: !upRatingVal ? Number(answer.downRating) + 1 : Number(answer.downRating),
      };
      updateAnswer(body);
      const response = await updateRating({
        answerId: body._id,
        ratingType: upRatingVal ? 'up' : 'down',
      });
      if (response.code !== 200 && response.status !== 'OK') {
        dispatch(prepareSnackbar({ open: true, severity: 'error', message: response.message }));
        setTimeout(() => {
          dispatch(resetSnackbar());
        }, snackbarTimer);
      } else {
        dispatch(prepareSnackbar({ open: true, severity: 'success', message: response.message }));
        setTimeout(() => {
          dispatch(resetSnackbar());
        }, snackbarTimer);
        getQna(questionId);
      }
    } else {
      dispatch(
        prepareSnackbar({
          open: true,
          severity: 'warning',
          message: 'You have to login first. Please login.',
        }),
      );
      setTimeout(() => {
        dispatch(resetSnackbar());
      }, snackbarTimer);
    }
  };

  const handleBookmark = async (questionId) => {
    if (isUserLooggedIn(userData)) {
      let body = {
        questionId,
      };
      const response = await updateBookmark(body);
      if (response.code !== 200 && response.status !== 'OK') {
        dispatch(prepareSnackbar({ open: true, severity: 'error', message: response.message }));
        setTimeout(() => {
          dispatch(resetSnackbar());
        }, snackbarTimer);
      } else {
        dispatch(prepareSnackbar({ open: true, severity: 'success', message: response.message }));
        setTimeout(() => {
          dispatch(resetSnackbar());
        }, snackbarTimer);
        getQna(questionId);
      }
    } else {
      dispatch(
        prepareSnackbar({
          open: true,
          severity: 'warning',
          message: 'You have to login first. Please login.',
        }),
      );
      setTimeout(() => {
        dispatch(resetSnackbar());
      }, snackbarTimer);
    }
  };

  return (
    <div className="ilqna-main">
      {isLoading && <Loader />}
      {/* <Button variant='contained' onClick={handleGoBack}>Back</Button>   */}
      {answerData && answerData.length > 0 ? (
        <>
          <div className="qna-question-list">
            <h3 className="qna-home-h3">{capitalizeFirstLetter(answerData[0]?.question)}</h3>
            <div>
              {answerData[0].whatYouHaveTried ? generateHTML(answerData[0].whatYouHaveTried) : null}
            </div>
            <h6 className="qna-home-h6">
              <span className="qna-home-span">
                <Chip
                  size="small"
                  className={`qna-regular-chip ${getStatusColor(answerData[0]?.status)}`}
                  label={
                    !answerData[0]?.status ? 'Open' : capitalizeFirstLetter(answerData[0]?.status)
                  }
                />
              </span>
              &nbsp; • &nbsp;
              <span className="qna-home-span">
                <Chip
                  size="small"
                  className={`qna-regular-chip ${getPriorityColor(answerData[0]?.priority)}`}
                  label={
                    !answerData[0]?.priority
                      ? 'Normal'
                      : capitalizeFirstLetter(answerData[0]?.priority)
                  }
                />
              </span>
              &nbsp; •
              <CommentIcon className="qna-svg-icon" />
              <span className="qna-home-span">{answerData[0]?.answers.length}</span>
              &nbsp; • &nbsp;
              <TodayIcon className="qna-svg-icon" />
              <span className="qna-home-span">
                {new Date(answerData[0]?.updatedDate).toDateString()}
              </span>
              &nbsp; •
              <BookmarkIcon
                className={`qna-svg-icon ${
                  checkIsBookmarkedByLoggedInUser(answerData[0], userData) ? 'bookmarked' : ''
                }`}
                onClick={() => handleBookmark(answerData[0]._id)}
              />
              <span className="qna-home-span">
                {answerData[0]?.total_bookmark?.length > 0
                  ? answerData[0]?.total_bookmark?.length
                  : 0}
              </span>
            </h6>
          </div>
          {answerData[0]?.answers.length > 0 ? (
            answerData[0]?.answers.map((ans) => {
              return (
                <>
                  <Divider variant="middle" />
                  <div className="qna-user-answers">
                    <div className="qna-user-data" key={ans._id}>
                      <div className="qna-user-image">
                        <StyledBadge
                          className="user-image-status"
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          variant="dot"
                        >
                          <Avatar
                            className="qna-user-image"
                            sx={{ bgcolor: generateRandomColor() }}
                          >
                            {ans.answer_user?.username[0]?.toUpperCase()}
                          </Avatar>
                        </StyledBadge>
                      </div>
                      <div className="qna-user-info">
                        <Typography variant="subtitle1">
                          <b>{ans.answer_user?.username}</b>
                        </Typography>
                        <Typography variant="subtitle2">
                          {capitalizeFirstLetter(ans.answer_user?.designation)}
                        </Typography>
                      </div>
                    </div>
                    <div className="answer-place">{generateHTML(ans.answer)}</div>
                    <div className="qna-user-list">
                      <h6 className="qna-home-h6">
                        <span className="qna-home-span">
                          <TrendingUpIcon
                            className="qna-svg-icon qna-icon qna-icon-hover-up"
                            label="trendingUp"
                            onClick={() => handleTrendingClick(answerData[0]._id, ans, true)}
                          />{' '}
                          {!ans.upRating ? 0 : ans.upRating}
                        </span>
                        &nbsp; • &nbsp;
                        <span className="qna-home-span">
                          <TrendingDownIcon
                            className="qna-svg-icon qna-icon qna-icon-hover-down"
                            label="trendingDown"
                            onClick={() => handleTrendingClick(answerData[0]._id, ans, false)}
                          />{' '}
                          {!ans.downRating ? 0 : ans.downRating}
                        </span>
                        &nbsp; • &nbsp;
                        <span className="qna-home-span">
                          <TodayIcon className="qna-svg-icon qna-dateIcon qna-icon" />
                          {new Date(ans.updatedDate).toDateString()}
                        </span>
                      </h6>
                      <div className="qna-user-upvote-list">
                        <HtmlTooltip
                          title={<TooltipProfileCard userData={ans.answer_user} />}
                          placement="top-start"
                        >
                          <Avatar
                            className="qna-user-image"
                            sx={{ bgcolor: generateRandomColor() }}
                          >
                            {ans.answer_user?.username[0]?.toUpperCase()}
                          </Avatar>
                        </HtmlTooltip>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <>
              <Divider variant="middle" />
              <div className="qna-user-answers">
                <center>
                  <strong>No Answers Available</strong>
                </center>
              </div>
            </>
          )}
          {/* <Divider variant="middle" /> */}
          <div
            className="qna-question-list"
            style={{ display: 'flex', marginTop: '20px', marginBottom: '5px' }}
          >
            {answerData[0].categories.length ? (
              <>
                <Typography variant="subtitle1" style={{ cursor: 'default', userSelect: 'none' }}>
                  <strong>Category: </strong>
                </Typography>
                {answerData[0].categories.map((cat) => {
                  return (
                    <>
                      <Chip
                        size="medium"
                        style={{ marginLeft: '10px' }}
                        className={`qna-regular-chip text-success border-success`}
                        label={capitalizeFirstLetter(cat.categoryName)}
                      />
                    </>
                  );
                })}
              </>
            ) : null}
          </div>
          <div
            className="qna-question-list"
            style={{ display: 'flex', marginTop: '20px', marginBottom: '5px' }}
          >
            {answerData[0].languages.length ? (
              <>
                <Typography variant="subtitle1" style={{ cursor: 'default', userSelect: 'none' }}>
                  <strong>Languages: </strong>
                </Typography>
                {answerData[0].languages.map((lang) => {
                  return (
                    <>
                      <Chip
                        size="medium"
                        style={{ marginLeft: '10px' }}
                        className={`qna-regular-chip text-primary border-primary`}
                        label={capitalizeFirstLetter(lang.languageName)}
                      />
                    </>
                  );
                })}
              </>
            ) : null}
          </div>
          {answerData[0]?.status === 'close' ? (
            <div>
              <Divider variant="middle">
                <Chip
                  className="bg-error"
                  icon={<CloseIcon color="white" />}
                  label="Closed due to inactivity"
                />
              </Divider>
            </div>
          ) : answerData[0]?.status === 'hold' ? (
            <div>
              <Divider variant="middle">
                <Chip
                  className="bg-warning"
                  icon={<RemoveCircleIcon />}
                  label="Hold due to inactivity"
                />
              </Divider>
            </div>
          ) : (
            <div>
              <Divider variant="middle">
                <Chip
                  className="bg-success"
                  icon={<CheckIcon color="white" />}
                  label="Please post your answers"
                />
              </Divider>
            </div>
          )}
          {answerData[0]?.status !== 'close' ? (
            <div className="qna-user-editor">
              <NeatEditor customId="ilqna-editor" defaultValue={editorValue} />
              &emsp;
              <LoadingButton
                className="qna-answer-save-btn"
                margin="normal"
                onClick={() => handleClickAsk(answerData[0]._id)}
                loading={loadingAsk}
                variant="contained"
                fullWidth
                disabled={userData?._id ? false : true}
              >
                <b>Answer {userData?._id ? '' : ' (Please login first)'}</b>
              </LoadingButton>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
