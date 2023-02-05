import React, { useEffect, useState, Fragment } from 'react';
import {useNavigate} from 'react-router-dom';
//UI
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { Chip, Divider } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import TodayIcon from '@mui/icons-material/Today';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

//SCSS
import '../../../sass/home.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllQuestions } from '../../../functions/APIs/question-api';
import { setQuestionData } from '../../../redux/questionRedux/question-slice';
import Loader from '../../Loaders/loader';

export default function UserQuestions() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  // const { data: questionData } = refactor(useFetchQuestionsQuery());
  const { questionData } = useSelector(state => state.question);
  const { userData } = useSelector(state => state.login);
  // console.log("questionsData: ", questionData);

  useEffect(() => {
      initialize();
  }, [])

  const initialize = async () => {
    let body = {
      questionUserId: userData?._id
    }
    const response = await fetchAllQuestions(body);
    dispatch(setQuestionData(response.data));
    setIsLoading(false);
  }
  const OpenQna = (_id) => {
    navigate(`/qna/${_id}`);
  }

  return (
    <div className='ilqna-main'>
      {isLoading && <Loader />}
      {
        questionData && questionData.map((quest) => {
          return (<Fragment key={ quest._id }>
            <div className="question-list" >
              <h3 className="home-h3" onClick={() => {OpenQna(quest._id)}}>{ quest.question }</h3>
              <h6 className="home-h6">
                <span className="home-span">Open</span> • 
                <CommentIcon className="svg-icon" /><span className="home-span">34</span> • 
                <TrendingUpIcon className="svg-icon trendingUp" label="trendingUp" /><span className="home-span">10</span> • 
                <TrendingDownIcon className="svg-icon trendingDown" label="trendingDown" /><span className="home-span">5</span> •  
                <TodayIcon className="svg-icon" /><span className="home-span">{ new Date(quest.updatedDate).toDateString() }</span>
                <span 
                  style={{float: 'right'}}
                >
                  {!quest.draft && 
                    <Chip 
                      size="small"
                      className={quest.active ? `qna-chip bg-success` : `qna-chip bg-error`}
                      label={quest.active ? 'Active' : 'Not Active'}
                      icon={quest.active ? <SentimentSatisfiedAltIcon className='icon-color' /> : <SentimentVeryDissatisfiedIcon className='icon-color' />}
                    />
                  }
                  {quest.active && 
                    <Chip 
                      size="small" 
                      className={quest.draft ? `qna-chip bg-primary` : `qna-chip bg-success`}
                      label={quest.draft ? 'Draft' : 'Asked'}
                      icon={quest.draft ? <SentimentSatisfiedIcon className='icon-color' /> : <SentimentSatisfiedAltIcon className='icon-color' />}
                    /> 
                  }
                </span>
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
