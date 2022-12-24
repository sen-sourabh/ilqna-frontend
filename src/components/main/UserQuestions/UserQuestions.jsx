import React from 'react';
import {useNavigate} from 'react-router-dom';
//UI
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { Divider } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import TodayIcon from '@mui/icons-material/Today';

//SCSS
import '../../../sass/home.scss';

export default function UserQuestions() {
  let navigate = useNavigate();

  const OpenQna = () => {
    navigate('/qna');
  }

  return (
    <div className='ilqna-main'>
      <div className="question-list" >
        <h3 
          className="home-h3"
          onClick={OpenQna}
        >
          Can I change my email name without creating a new account?...
        </h3>
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
    </div>
  )
}
