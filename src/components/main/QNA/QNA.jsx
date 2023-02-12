import React, {useEffect, useState} from 'react';
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
import { capitalizeFirstLetter, generateHTML, generateRandomColor, getPriorityColor, getStatusColor, removeTags, snackbarTimer } from '../../../functions/common/common';
import { NeatEditor } from '../../NeatEditor/NeatEditor';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Loaders/loader';
import { addAnswer, fetchAllAnswersByQuestionId } from '../../../functions/APIs/answer-api';
import { setAnswerData } from '../../../redux/answerRedux/answer-slice';
import { initializeConnect } from 'react-redux/es/components/connect';
import { prepareSnackbar, resetSnackbar } from '../../../redux/snackbarRedux/snackbar-slice';

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
  const { userData } = useSelector(state => state.login);
  const { answerData } = useSelector(state => state.answer);
  const [editorValue, setEditorValue] = useState("Add your answers here...")
  
  useEffect(() => {
    window.scrollTo(0, 0);
    initialize()
  }, [])

  const initialize = () => {
    if(answerData.length === 0) {
        if(localStorage.getItem('qna') && JSON.parse(localStorage.getItem('qna')).length) {
            let qna = JSON.parse(localStorage.getItem('qna'))[0]
            getQna(qna._id);
            console.log(JSON.parse(localStorage.getItem('qna')));
        }
    }
    setIsLoading(false)
  }

  const getQna = async (_id) => {
    let body = {
        _id
    }
    // if(userData?._id) {
    //     body = {...body, questionUserId: userData?._id}
    // }
    const response = await fetchAllAnswersByQuestionId(body);
    dispatch(setAnswerData(response.data));
  }
  
  const handleClickAsk = async (questionId) => {
    setLoadingAsk(true);
    let ans = document.getElementById('ilqna-editor');
    let answer = (ans.innerHTML === "Add your answers here..." || ans.innerHTML === '') ? '' : ans.innerHTML;
    if(!removeTags(answer)) {
        dispatch(prepareSnackbar({ open: true, severity: 'error', message: "Answer is required." }))
        setTimeout(() => { dispatch(resetSnackbar()) }, snackbarTimer)
    } else {
        let body ={
            answer,
            questionId,
            answerUserId: JSON.parse(localStorage.getItem('userData'))._id,
            ipAddress: localStorage.getItem('ipLocationData') ? JSON.parse(localStorage.getItem('ipLocationData')).ipAddress : '',
            location: localStorage.getItem('ipLocationData') ? JSON.parse(localStorage.getItem('ipLocationData')).location : ''
        }
        const response = await addAnswer(body);
        if(response.code !== 200 && response.status !== "OK") {
            dispatch(prepareSnackbar({ open: true, severity: 'error', message: response.message }))
            setTimeout(() => { dispatch(resetSnackbar()) }, snackbarTimer)
        } else {
            dispatch(prepareSnackbar({ open: true, severity: 'success', message: response.message }))
            setTimeout(() => { dispatch(resetSnackbar()) }, snackbarTimer)
            handleClearForm();
            getQna(questionId);
        }
    }
    setLoadingAsk(false);
  }

  const handleClearForm = () => {
    var desc = document.getElementById("ilqna-editor");
    desc.innerHTML = "Add your answers here...";
  }

  return (
    <div className='ilqna-main'>
        {isLoading && <Loader />}
        {/* <Button variant='contained' onClick={handleGoBack}>Back</Button>   */}
        {
            answerData && answerData.length > 0 ?
            <>
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
                                <div className='answer-place'>
                                    { generateHTML(ans.answer) }
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
                                customId='ilqna-editor'
                                defaultValue={editorValue}
                            />
                            &emsp;
                            <LoadingButton
                                className='qna-answer-save-btn'
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
                    : null
                }    
            </>
            :
            null
        }
    </div>
  )
}
