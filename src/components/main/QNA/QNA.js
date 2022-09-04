import React, {useState} from 'react';
//UI
import { Button, Typography, Avatar, Tooltip, Chip } from '@mui/material';
import AvatarGroup from '@mui/material/AvatarGroup';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { Divider } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import TodayIcon from '@mui/icons-material/Today';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

//SCSS
import '../../../sass/main.scss';
import '../../../sass/qna.scss';
import { LoadingButton } from '@mui/lab';

//Common Functions
import { generateRandomColor } from '../../../functions/common/common';

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
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  
  const handleGoBack = () => {
    navigate('/user-questions');
  }

  return (
    <div className='ilqna-main'>
        <Button variant='contained' onClick={handleGoBack}><ArrowBackIcon />Back</Button>  
        <div className="qna-question-list" >
            <h3 className="qna-home-h3">
                Can I change my email name without creating a new account? Can I change my email name without creating a new account? Can I change my email name without creating a new account?
            </h3>
            <h6 className="qna-home-h6">
                <span className="qna-home-span">Open</span> • 
                <CommentIcon className="svg-icon" /><span className="qna-home-span">34</span> • 
                <TrendingUpIcon className="svg-icon qna-trendingUp" label="trendingUp" /><span className="qna-home-span">10</span> • 
                <TrendingDownIcon className="svg-icon qna-trendingDown" label="trendingDown" /><span className="qna-home-span">5</span> •  
                <TodayIcon className="svg-icon" /><span className="qna-home-span">{ new Date().toDateString() }</span>
            </h6>
        </div>
        <Divider />
        <div className='qna-user-answers'>
            <div className='qna-user-data'>
                <div className='qna-user-image'>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar sx={{ bgcolor: generateRandomColor() }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </StyledBadge>
                </div>
                <div className='qna-user-info'>
                    <Typography variant='subtitle1'>Remy Sharp</Typography>
                    <Typography variant='subtitle2'>Fullstack Software Engineer</Typography>
                </div>
            </div>
            <h5>Whatever the reason, don't worry - you can do it in a few simple steps. Just remember:</h5>
            <ul>
            <li>You can't change your username or the actual email address. You can only change the name associated with the account.
            </li>
            <li>If people have you saved as something else in their contacts, that's the name they'll see. Your "new name" will only show up in emails you send to them.
            </li>
            </ul>
            <div className='qna-user-list'>
                <h6 className="qna-home-h6">
                    <Tooltip title='click to trend up' placement='top' arrow>
                        <TrendingUpIcon 
                            className="qna-svg-icon qna-icon qna-icon-hover-up" 
                            label="trendingUp"
                        />
                    </Tooltip>
                    <Tooltip title='Click to trend down' placement='top' arrow>
                        <TrendingDownIcon 
                            className="qna-svg-icon qna-icon qna-icon-hover-down" 
                            label="trendingDown"
                        />
                    </Tooltip>
                    <Tooltip title={new Date().toDateString()} placement='top' arrow>
                        <TodayIcon className="qna-svg-icon qna-dateIcon qna-icon" />
                    </Tooltip>
                </h6>
                <div className='qna-user-upvote-list'>
                    <Tooltip title='Vote by' placement='top' arrow>
                        <AvatarGroup total={24}>
                            <Avatar sx={{ bgcolor: generateRandomColor() }} alt="Remy Doe" src="/static/images/avatar/1.jpg" />
                            <Avatar sx={{ bgcolor: generateRandomColor() }} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            <Avatar sx={{ bgcolor: generateRandomColor() }} alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                            <Avatar sx={{ bgcolor: generateRandomColor() }} alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                        </AvatarGroup>
                    </Tooltip>
                </div>
            </div>
        </div>
        <Divider variant='middle' />
        <div className='qna-user-answers'>
            <div className='qna-user-data'>
                <div className='qna-user-image'>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar sx={{ bgcolor: generateRandomColor() }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </StyledBadge>
                </div>
                <div className='qna-user-info'>
                    <Typography variant='subtitle1'>Remy Sharp</Typography>
                    <Typography variant='subtitle2'>Fullstack Software Engineer</Typography>
                </div>
            </div>
            <h5>Whatever the reason, don't worry - you can do it in a few simple steps. Just remember:</h5>
            <ul>
            <li>You can't change your username or the actual email address. You can only change the name associated with the account.
            </li>
            <li>If people have you saved as something else in their contacts, that's the name they'll see. Your "new name" will only show up in emails you send to them.
            </li>
            </ul>
            <div className='qna-user-list'>
                <h6 className="qna-home-h6">
                    <Tooltip title='click to trend up' placement='top' arrow>
                        <TrendingUpIcon 
                            className="qna-svg-icon qna-icon qna-icon-hover-up" 
                            label="trendingUp"
                        />
                    </Tooltip>
                    <Tooltip title='Click to trend down' placement='top' arrow>
                        <TrendingDownIcon 
                            className="qna-svg-icon qna-icon qna-icon-hover-down" 
                            label="trendingDown"
                        />
                    </Tooltip>
                    <Tooltip title={new Date().toDateString()} placement='top' arrow>
                        <TodayIcon className="qna-svg-icon qna-dateIcon qna-icon" />
                    </Tooltip>
                </h6>
                <div className='qna-user-upvote-list'>
                    <Tooltip title='Vote by' placement='top' arrow>
                        <AvatarGroup total={24}>
                            <Avatar sx={{ bgcolor: generateRandomColor() }} alt="Remy Doe" src="/static/images/avatar/1.jpg" />
                            <Avatar sx={{ bgcolor: generateRandomColor() }} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            <Avatar sx={{ bgcolor: generateRandomColor() }} alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                            <Avatar sx={{ bgcolor: generateRandomColor() }} alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                        </AvatarGroup>
                    </Tooltip>
                </div>
            </div>
        </div>
        <Divider variant='middle' />
        <div className='qna-user-answers'>
            <div className='qna-user-data'>
                <div className='qna-user-image'>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar sx={{ bgcolor: generateRandomColor() }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </StyledBadge>
                </div>
                <div className='qna-user-info'>
                    <Typography variant='subtitle1'>Remy Sharp</Typography>
                    <Typography variant='subtitle2'>Fullstack Software Engineer</Typography>
                </div>
            </div>
            <h5>Whatever the reason, don't worry - you can do it in a few simple steps. Just remember:</h5>
            <ul>
            <li>You can't change your username or the actual email address. You can only change the name associated with the account.
            </li>
            <li>If people have you saved as something else in their contacts, that's the name they'll see. Your "new name" will only show up in emails you send to them.
            </li>
            </ul>
            <div className='qna-user-list'>
                <h6 className="qna-home-h6">
                    <Tooltip title='click to trend up' placement='top' arrow>
                        <TrendingUpIcon 
                            className="qna-svg-icon qna-icon qna-icon-hover-up" 
                            label="trendingUp"
                        />
                    </Tooltip>
                    <Tooltip title='Click to trend down' placement='top' arrow>
                        <TrendingDownIcon 
                            className="qna-svg-icon qna-icon qna-icon-hover-down" 
                            label="trendingDown"
                        />
                    </Tooltip>
                    <Tooltip title={new Date().toDateString()} placement='top' arrow>
                        <TodayIcon className="qna-svg-icon qna-dateIcon qna-icon" />
                    </Tooltip>
                </h6>
                <div className='qna-user-upvote-list'>
                    <Tooltip title='Vote by' placement='top' arrow>
                        <AvatarGroup total={24}>
                            <Avatar sx={{ bgcolor: generateRandomColor() }} alt="Remy Doe" src="/static/images/avatar/1.jpg" />
                            <Avatar sx={{ bgcolor: generateRandomColor() }} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            <Avatar sx={{ bgcolor: generateRandomColor() }} alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                            <Avatar sx={{ bgcolor: generateRandomColor() }} alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                        </AvatarGroup>
                    </Tooltip>
                </div>
            </div>
        </div>
        <Divider variant='middle' />
        <div className='qna-user-answers'>
            <div className='qna-user-data'>
                <div className='qna-user-image'>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar sx={{ bgcolor: generateRandomColor() }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </StyledBadge>
                </div>
                <div className='qna-user-info'>
                    <Typography variant='subtitle1'>Remy Sharp</Typography>
                    <Typography variant='subtitle2'>Fullstack Software Engineer</Typography>
                </div>
            </div>
            <h5>Whatever the reason, don't worry - you can do it in a few simple steps. Just remember:</h5>
            <ul>
            <li>You can't change your username or the actual email address. You can only change the name associated with the account.
            </li>
            <li>If people have you saved as something else in their contacts, that's the name they'll see. Your "new name" will only show up in emails you send to them.
            </li>
            </ul>
            <div className='qna-user-list'>
                <h6 className="qna-home-h6">
                    <Tooltip title='click to trend up' placement='top' arrow>
                        <TrendingUpIcon 
                            className="qna-svg-icon qna-icon qna-icon-hover-up" 
                            label="trendingUp"
                        />
                    </Tooltip>
                    <Tooltip title='Click to trend down' placement='top' arrow>
                        <TrendingDownIcon 
                            className="qna-svg-icon qna-icon qna-icon-hover-down" 
                            label="trendingDown"
                        />
                    </Tooltip>
                    <Tooltip title={new Date().toDateString()} placement='top' arrow>
                        <TodayIcon className="qna-svg-icon qna-dateIcon qna-icon" />
                    </Tooltip>
                </h6>
                <div className='qna-user-upvote-list'>
                    <Tooltip title='Vote by' placement='top' arrow>
                        <AvatarGroup total={24}>
                            <Avatar sx={{ bgcolor: generateRandomColor() }} alt="Remy Doe" src="/static/images/avatar/1.jpg" />
                            <Avatar sx={{ bgcolor: generateRandomColor() }} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            <Avatar sx={{ bgcolor: generateRandomColor() }} alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                            <Avatar sx={{ bgcolor: generateRandomColor() }} alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                        </AvatarGroup>
                    </Tooltip>
                </div>
            </div>
        </div>
        {/* <Divider variant='middle' /> */}
        <div>
            <Divider variant='middle'>
                <Chip color="error" icon={<CloseIcon />} label='Closed due to inactivity' />
            </Divider>
        </div>
        <div className='qna-user-editor'>
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
                wrapperStyle={{width: '100%', height: 'auto', border: '1px solid lightgrey', cursor: 'text', zIndex: '99', backgroundColor: 'white'}}
            />
            &emsp;
            <LoadingButton
                className='qna-answer-save-btn'
                margin="normal" 
                // onClick={handleClickAsk}
                // loading={loadingAsk}
                variant="contained"
                fullWidth
                // disabled={clickOnOne}
              >
                <b>Answer</b>
            </LoadingButton>
        </div>
    </div>
  )
}
