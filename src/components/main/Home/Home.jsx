import React, { Fragment, useEffect, useState } from 'react';
//UI
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { Chip, Divider } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import TodayIcon from '@mui/icons-material/Today';
//SCSS
// import '../../../sass/main.scss';
import '../../../sass/home.scss';
// import { useFetchQuestionsQuery } from '../../../redux/api-saga/questions-api';
// import { refactor } from '../../../functions/common/common';
import Loader from '../../Loaders/loader';
import { fetchAllQuestions } from '../../../functions/APIs/question-api';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestionData } from '../../../redux/questionRedux/question-slice';
import { capitalizeFirstLetter, getPriorityColor, getStatusColor } from '../../../functions/common/common';
import { useFetchQuestionsQuery } from '../../../redux/api-saga/questions-api';

export default function Home() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  // const { data: questionData } = refactor(useFetchQuestionsQuery());
  const { questionData } = useSelector(state => state.question);
  // console.log("questionsData: ", questionData);

  useEffect(() => {
      initialize();
  }, [])

  const initialize = async () => {
    const response = await fetchAllQuestions();
    dispatch(setQuestionData(response.data));
    setIsLoading(false);
  }

  return (
    <div className='ilqna-main'>
      {isLoading && <Loader />}
      {
        questionData && questionData.map((quest) => {
          return (<Fragment key={ quest._id }>
            <div className="question-list" >
              <h6 className="home-h3">{ capitalizeFirstLetter(quest.question) }</h6>
              <h6 className="home-h6">
                <span className="home-span">
                    <Chip 
                      size="small"
                      className={`regular-chip ${getStatusColor(quest.status)}`}
                      label={ !quest.status ? 'Open' : capitalizeFirstLetter(quest.status)  }
                    />
                </span>
                &nbsp; • &nbsp;
                <span className="home-span">
                    <Chip 
                      size="small"
                      className={`regular-chip ${getPriorityColor(quest.priority)}`}
                      label={ !quest.priority ? 'Normal' : capitalizeFirstLetter(quest.priority)  }
                    />
                </span>
                &nbsp; • 
                <TrendingUpIcon className="svg-icon trendingUp" label="trendingUp" />
                  <span className="home-span">
                    { !quest.answers?.upRating ? 0 : quest.answers?.upRating }
                  </span>
                &nbsp; • 
                <TrendingDownIcon className="svg-icon trendingDown" label="trendingDown" />
                  <span className="home-span">
                    { !quest.answers?.downRating ? 0 : quest.answers?.downRating }
                  </span>
                &nbsp; • &nbsp; 
                {/* <TodayIcon className="svg-icon" /> */}
                <span className="home-span">{ new Date(quest.updatedDate).toDateString() }</span>
              </h6>
            </div>
            <Divider variant="middle" />
          </Fragment>)
        })
      }
      
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
  )
}
