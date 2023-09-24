import React, { useEffect, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
//UI
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { Chip, Divider } from '@mui/material';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import TodayIcon from '@mui/icons-material/Today';

//SCSS
import '../../../sass/home.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllQuestions } from '../../../functions/APIs/question-api';
import { setQuestionData } from '../../../redux/questionRedux/question-slice';
import Loader from '../../Loaders/loader';
import {
  capitalizeFirstLetter,
  checkIsBookmarkedByLoggedInUser,
  getPriorityColor,
  getStatusColor,
} from '../../../functions/common/common';
import { setAnswerData } from '../../../redux/answerRedux/answer-slice';
import { fetchAllAnswersByQuestionId } from '../../../functions/APIs/answer-api';
import { NotFoundByFilter } from '../../headers/parts/NotFoundByFilter';

export default function UserQuestions() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  // const { data: questionData } = refactor(useFetchQuestionsQuery());
  const { questionData } = useSelector((state) => state.question);
  const { userData } = useSelector((state) => state.login);

  // console.log("questionsData: ", questionData);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    let body = {
      questionUserId: userData?._id,
    };
    const response = await fetchAllQuestions(body);
    dispatch(setQuestionData(response.data));
    setIsLoading(false);
  };

  const OpenQna = async (_id) => {
    setIsLoading(true);
    let body = {
      _id,
    };
    if (userData?._id) {
      body = { ...body, questionUserId: userData?._id };
    }
    const response = await fetchAllAnswersByQuestionId(body);
    dispatch(setAnswerData(response.data));
    setIsLoading(false);
    navigate(`/qna`);
  };

  return (
    <div className="ilqna-main">
      {isLoading && <Loader />}
      <NotFoundByFilter />
      {questionData &&
        questionData.map((quest) => {
          return (
            <Fragment key={quest._id}>
              <div className="question-list">
                <h6
                  className="home-h3"
                  onClick={() => {
                    OpenQna(quest._id);
                  }}
                >
                  {capitalizeFirstLetter(quest.question)}
                </h6>
                <h6 className="home-h6">
                  <span className="home-span">
                    <Chip
                      size="small"
                      className={`regular-chip ${getStatusColor(quest.status)}`}
                      label={!quest.status ? 'Open' : capitalizeFirstLetter(quest.status)}
                    />
                  </span>
                  &nbsp; • &nbsp;
                  <span className="home-span">
                    <Chip
                      size="small"
                      className={`regular-chip ${getPriorityColor(quest.priority)}`}
                      label={!quest.priority ? 'Normal' : capitalizeFirstLetter(quest.priority)}
                    />
                  </span>
                  &nbsp; •
                  <TrendingUpIcon className="svg-icon trendingUp" label="trendingUp" />
                  <span className="home-span">
                    {!quest.answers?.upRating ? 0 : quest.answers?.upRating}
                  </span>
                  &nbsp; •
                  <TrendingDownIcon className="svg-icon trendingDown" label="trendingDown" />
                  <span className="home-span">
                    {!quest.answers?.downRating ? 0 : quest.answers?.downRating}
                  </span>
                  &nbsp; • &nbsp;
                  <TodayIcon className="svg-icon" />
                  <span className="home-span">{new Date(quest.updatedDate).toDateString()}</span>
                  &nbsp; •
                  <BookmarkIcon
                    className={`svg-icon ${
                      checkIsBookmarkedByLoggedInUser(quest, userData) ? 'bookmarked' : ''
                    }`}
                  />
                  <span className="home-span">
                    {quest?.total_bookmark?.length > 0 ? quest?.total_bookmark?.length : 0}
                  </span>
                  <span className="draft-status">
                    {!quest.draft && (
                      <Chip
                        size="small"
                        className={quest.active ? `home-chip bg-success` : `home-chip bg-error`}
                        label={quest.active ? 'Active' : 'Not Active'}
                        icon={
                          quest.active ? (
                            <SentimentSatisfiedAltIcon className="icon-color" />
                          ) : (
                            <SentimentVeryDissatisfiedIcon className="icon-color" />
                          )
                        }
                      />
                    )}
                    {quest.active && (
                      <Chip
                        size="small"
                        className={quest.draft ? `home-chip bg-primary` : `home-chip bg-success`}
                        label={quest.draft ? 'Draft' : 'Asked'}
                        icon={
                          quest.draft ? (
                            <SentimentSatisfiedIcon className="icon-color" />
                          ) : (
                            <SentimentSatisfiedAltIcon className="icon-color" />
                          )
                        }
                      />
                    )}
                  </span>
                </h6>
              </div>
              <Divider variant="middle" />
            </Fragment>
          );
        })}

      {/* <div className="question-list" >
        <h3 className="home-h3">Can I change my email name without creating a new account?...</h3>
        <h6 className="home-h6">
          <span className="home-span">Open</span> • 
          <CommentIcon className="svg-icon" /><span className="home-span">34</span> • 
          <TrendingUpIcon className="svg-icon trendingUp" label="trendingUp" /><span className="home-span">10</span> • 
          <TrendingDownIcon className="svg-icon trendingDown" label="trendingDown" /><span className="home-span">5</span> •  
          <TodayIcon className="svg-icon" /><span className="home-span">{ new Date().toDateString() }</span>
        </h6>
      </div>
      <Divider variant="middle" />
      <div className="question-list" >
        <h3 className="home-h3">Can I change my email name without creating a new account?...</h3>
        <h6 className="home-h6">
          <span className="home-span">Open</span> • 
          <CommentIcon className="svg-icon" /><span className="home-span">34</span> • 
          <TrendingUpIcon className="svg-icon trendingUp" label="trendingUp" /><span className="home-span">10</span> • 
          <TrendingDownIcon className="svg-icon trendingDown" label="trendingDown" /><span className="home-span">5</span> •  
          <TodayIcon className="svg-icon" /><span className="home-span">{ new Date().toDateString() }</span>
        </h6>
      </div>
      <Divider variant="middle" />
      <div className="question-list" >
        <h3 className="home-h3">Can I change my email name without creating a new account?...</h3>
        <h6 className="home-h6">
          <span className="home-span">Open</span> • 
          <CommentIcon className="svg-icon" /><span className="home-span">34</span> • 
          <TrendingUpIcon className="svg-icon trendingUp" label="trendingUp" /><span className="home-span">10</span> • 
          <TrendingDownIcon className="svg-icon trendingDown" label="trendingDown" /><span className="home-span">5</span> •  
          <TodayIcon className="svg-icon" /><span className="home-span">{ new Date().toDateString() }</span>
        </h6>
      </div>
      <Divider variant="middle" />
      <div className="question-list" >
        <h3 className="home-h3">Can I change my email name without creating a new account?...</h3>
        <h6 className="home-h6">
          <span className="home-span">Open</span> • 
          <CommentIcon className="svg-icon" /><span className="home-span">34</span> • 
          <TrendingUpIcon className="svg-icon trendingUp" label="trendingUp" /><span className="home-span">10</span> • 
          <TrendingDownIcon className="svg-icon trendingDown" label="trendingDown" /><span className="home-span">5</span> •  
          <TodayIcon className="svg-icon" /><span className="home-span">{ new Date().toDateString() }</span>
        </h6>
      </div>
      <Divider variant="middle" />
      <div className="question-list" >
        <h3 className="home-h3">Can I change my email name without creating a new account?...</h3>
        <h6 className="home-h6">
          <span className="home-span">Open</span> • 
          <CommentIcon className="svg-icon" /><span className="home-span">34</span> • 
          <TrendingUpIcon className="svg-icon trendingUp" label="trendingUp" /><span className="home-span">10</span> • 
          <TrendingDownIcon className="svg-icon trendingDown" label="trendingDown" /><span className="home-span">5</span> •  
          <TodayIcon className="svg-icon" /><span className="home-span">{ new Date().toDateString() }</span>
        </h6>
      </div>
      <Divider variant="middle" />
      <div className="question-list" >
        <h3 className="home-h3">Can I change my email name without creating a new account?...</h3>
        <h6 className="home-h6">
          <span className="home-span">Open</span> • 
          <CommentIcon className="svg-icon" /><span className="home-span">34</span> • 
          <TrendingUpIcon className="svg-icon trendingUp" label="trendingUp" /><span className="home-span">10</span> • 
          <TrendingDownIcon className="svg-icon trendingDown" label="trendingDown" /><span className="home-span">5</span> •  
          <TodayIcon className="svg-icon" /><span className="home-span">{ new Date().toDateString() }</span>
        </h6>
      </div>
      <Divider variant="middle" />
      <div className="question-list" >
        <h3 className="home-h3">Can I change my email name without creating a new account?...</h3>
        <h6 className="home-h6">
          <span className="home-span">Open</span> • 
          <CommentIcon className="svg-icon" /><span className="home-span">34</span> • 
          <TrendingUpIcon className="svg-icon trendingUp" label="trendingUp" /><span className="home-span">10</span> • 
          <TrendingDownIcon className="svg-icon trendingDown" label="trendingDown" /><span className="home-span">5</span> •  
          <TodayIcon className="svg-icon" /><span className="home-span">{ new Date().toDateString() }</span>
        </h6>
      </div>
      <Divider variant="middle" />
      <div className="question-list" >
        <h3 className="home-h3">Can I change my email name without creating a new account?...</h3>
        <h6 className="home-h6">
          <span className="home-span">Open</span> • 
          <CommentIcon className="svg-icon" /><span className="home-span">34</span> • 
          <TrendingUpIcon className="svg-icon trendingUp" label="trendingUp" /><span className="home-span">10</span> • 
          <TrendingDownIcon className="svg-icon trendingDown" label="trendingDown" /><span className="home-span">5</span> •  
          <TodayIcon className="svg-icon" /><span className="home-span">{ new Date().toDateString() }</span>
        </h6>
      </div>
      <Divider variant="middle" />
      <div className="question-list" >
        <h3 className="home-h3">Can I change my email name without creating a new account?...</h3>
        <h6 className="home-h6">
          <span className="home-span">Open</span> • 
          <CommentIcon className="svg-icon" /><span className="home-span">34</span> • 
          <TrendingUpIcon className="svg-icon trendingUp" label="trendingUp" /><span className="home-span">10</span> • 
          <TrendingDownIcon className="svg-icon trendingDown" label="trendingDown" /><span className="home-span">5</span> •  
          <TodayIcon className="svg-icon" /><span className="home-span">{ new Date().toDateString() }</span>
        </h6>
      </div>
      <Divider variant="middle" />
      <div className="question-list" >
        <h3 className="home-h3">Can I change my email name without creating a new account?...</h3>
        <h6 className="home-h6">
          <span className="home-span">Open</span> • 
          <CommentIcon className="svg-icon" /><span className="home-span">34</span> • 
          <TrendingUpIcon className="svg-icon trendingUp" label="trendingUp" /><span className="home-span">10</span> • 
          <TrendingDownIcon className="svg-icon trendingDown" label="trendingDown" /><span className="home-span">5</span> •  
          <TodayIcon className="svg-icon" /><span className="home-span">{ new Date().toDateString() }</span>
        </h6>
      </div>
      <Divider variant="middle" />
      <div className="question-list" >
        <h3 className="home-h3">Can I change my email name without creating a new account?...</h3>
        <h6 className="home-h6">
          <span className="home-span">Open</span> • 
          <CommentIcon className="svg-icon" /><span className="home-span">34</span> • 
          <TrendingUpIcon className="svg-icon trendingUp" label="trendingUp" /><span className="home-span">10</span> • 
          <TrendingDownIcon className="svg-icon trendingDown" label="trendingDown" /><span className="home-span">5</span> •  
          <TodayIcon className="svg-icon" /><span className="home-span">{ new Date().toDateString() }</span>
        </h6>
      </div>
      <Divider variant="middle" /> */}
    </div>
  );
}
