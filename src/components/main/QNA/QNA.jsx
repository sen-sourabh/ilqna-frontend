import React, {useState} from 'react';
//UI
import { Typography, Avatar, Tooltip, Chip, Button } from '@mui/material';
import AvatarGroup from '@mui/material/AvatarGroup';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { Divider } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import TodayIcon from '@mui/icons-material/Today';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CheckIcon from '@mui/icons-material/Check';

//SCSS
import '../../../sass/qna.scss';
import { LoadingButton } from '@mui/lab';

//Common Functions
import { capitalizeFirstLetter, generateRandomColor, getPriorityColor, getStatusColor } from '../../../functions/common/common';
import { NeatEditor } from '../../NeatEditor/NeatEditor';
import { useSelector } from 'react-redux';

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
//   let navigate = useNavigate();
  const { answerData } = useSelector(state => state.answer);
  const [editorValue, setEditorValue] = useState("Add your answers here...")

  console.log("answerData: ", answerData);
  
//   const handleGoBack = () => {
//     navigate('/user-questions');
//   }

  return (
    <div className='ilqna-main'>
        {/* <Button variant='contained' onClick={handleGoBack}>Back</Button>   */}
        <div className="qna-question-list" >
            <h3 className="qna-home-h3">
                { capitalizeFirstLetter(answerData[0]?.question) }
            </h3>
            <h6 className="qna-home-h6">
                <span className="qna-home-span">
                    <Chip 
                      size="small"
                      className={`qna-regular-chip ${getStatusColor(answerData[0]?.status)}`}
                      label={ !answerData[0]?.status ? 'Open' : capitalizeFirstLetter(answerData[0]?.status)  }
                    />
                </span>
                &nbsp; • &nbsp;
                <span className="qna-home-span">
                    <Chip 
                      size="small"
                      className={`qna-regular-chip ${getPriorityColor(answerData[0]?.priority)}`}
                      label={ !answerData[0]?.priority ? 'Normal' : capitalizeFirstLetter(answerData[0]?.priority)  }
                    />
                </span>
                &nbsp; •
                <CommentIcon className="qna-svg-icon" />
                    <span className="qna-home-span">
                        { answerData[0]?.answers.length }
                    </span>
                &nbsp; • &nbsp; 
                <TodayIcon className="qna-svg-icon" />
                <span className="qna-home-span">{ new Date(answerData[0]?.updatedDate).toDateString() }</span>
            </h6>
        </div>
        { 
            answerData[0]?.answers.length > 0 ? answerData[0]?.answers.map((ans) => {
                return (
                    <>
                    <Divider variant='middle' />
                    <div className='qna-user-answers'>
                        <div className='qna-user-data' key={ans._id}>
                            <div className='qna-user-image'>
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                >
                                    <Avatar sx={{ bgcolor: generateRandomColor() }}>{ ans.answer_user?.username[0]?.toUpperCase() }</Avatar>
                                </StyledBadge>
                            </div>
                            <div className='qna-user-info'>
                                <Typography variant='subtitle1'><b>{ ans.answer_user?.username }</b></Typography>
                                <Typography variant='subtitle2'>{ capitalizeFirstLetter(ans.answer_user?.designation) }</Typography>
                            </div>
                        </div>
                        <div>
                            { ans.answer }
                        </div>
                        <div className='qna-user-list'>
                            <h6 className="qna-home-h6">
                                <span className="qna-home-span">
                                    <TrendingUpIcon 
                                        className="qna-svg-icon qna-icon qna-icon-hover-up" 
                                        label="trendingUp"
                                    /> { !ans.upRating ? 0 : ans.upRating }
                                </span>
                                &nbsp; • &nbsp;
                                <span className="qna-home-span">
                                    <TrendingDownIcon 
                                        className="qna-svg-icon qna-icon qna-icon-hover-down" 
                                        label="trendingDown"
                                    /> { !ans.downRating ? 0 : ans.downRating }
                                </span>
                                &nbsp; • &nbsp;
                                <span className="qna-home-span">    
                                    <TodayIcon className="qna-svg-icon qna-dateIcon qna-icon" />
                                    { new Date(ans.updatedDate).toDateString() }
                                </span>
                            </h6>
                            <div className='qna-user-upvote-list'>
                                <Tooltip title='Vote by' placement='top' arrow>
                                    {/* <AvatarGroup total={24}> */}
                                        <Avatar sx={{ bgcolor: generateRandomColor() }}>{ ans.answer_user?.username[0]?.toUpperCase() }</Avatar>
                                    {/* </AvatarGroup> */}
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    </>
                )
            })
            :
            <>
                <Divider variant='middle' />
                <div className='qna-user-answers'>
                    <center><strong>No Answers Available</strong></center>
                </div>
            </>
        }
        { 
            answerData[0]?.status === 'close' ? 
                <div>
                    <Divider variant='middle'>
                        <Chip className="bg-error" icon={<CloseIcon color="white" />} label='Closed due to inactivity' />
                    </Divider>
                </div>
            :
            answerData[0]?.status === 'hold' ?
                <div>
                    <Divider variant='middle'>
                        <Chip className="bg-warning" icon={<RemoveCircleIcon />} label='Hold due to inactivity' />
                    </Divider>
                </div>
            :
                <div>
                    <Divider variant='middle'>
                        <Chip className="bg-success" icon={<CheckIcon color="white" />} label='Please post your answers' />
                    </Divider>
                </div>
        }
        { 
            answerData[0]?.status !== 'close' ? 
                <div className='qna-user-editor'>
                    <NeatEditor
                        defaultValue={editorValue}
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
            : null
        }

{/* 
        
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
        </div> */}
        {/* <Divider variant='middle' /> */}
        
    </div>
  )
}
