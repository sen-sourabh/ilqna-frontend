import { Checkbox, Chip, Paper } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { openShowMessage } from '../../../../redux/dialogRedux/show-message-slice';
import '../../../../sass/inbox-messages.scss';

import GradeIcon from '@mui/icons-material/Grade';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';

export const InboxMessages = ({ badgeLabel = 'New', pageName = 'Inbox' }) => {
    const dispatch = useDispatch();
    const handleOpenMessage = (e) => {
        if(!e.target.hasOwnProperty('checked')) {
            dispatch(openShowMessage(true))
        }
    }

  return (
    <div>
        <Paper className="message-box" onClick={handleOpenMessage}>
            <Checkbox aria-label="Checkbox demo" color="warning" icon={<GradeOutlinedIcon />} checkedIcon={<GradeIcon />} />
            <h5>Hi! How are you? Are you coming here. 
                <span className='message-date'>
                    <Chip size="small" label={badgeLabel} className={badgeLabel === 'New' ? 'new-badge' : 'today-badge'}/>
                    {new Date().toDateString()}
                </span>
            </h5>
        </Paper>
        <Paper className="message-box" onClick={handleOpenMessage}>
            <Checkbox aria-label="Checkbox demo" color="warning" icon={<GradeOutlinedIcon />} checkedIcon={<GradeIcon />} />
            <h5>Hi! How are you? Are you coming here. <span className='message-date'>{new Date().toDateString()}</span></h5>
        </Paper>
        <Paper className="message-box" onClick={handleOpenMessage}>
            <Checkbox aria-label="Checkbox demo" color="warning" icon={<GradeOutlinedIcon />} checkedIcon={<GradeIcon />} />
            <h5>Hi! How are you? Are you coming here. <span className='message-date'>{new Date().toDateString()}</span></h5>
        </Paper>
        <Paper className="message-box" onClick={handleOpenMessage}>
            <Checkbox aria-label="Checkbox demo" color="warning" icon={<GradeOutlinedIcon />} checkedIcon={<GradeIcon />} />
            <h5>Hi! How are you? Are you coming here. <span className='message-date'>{new Date().toDateString()}</span></h5>
        </Paper>
        <Paper className="message-box" onClick={handleOpenMessage}>
            <Checkbox aria-label="Checkbox demo" color="warning" icon={<GradeOutlinedIcon />} checkedIcon={<GradeIcon />} />
            <h5>Hi! How are you? Are you coming here. <span className='message-date'>{new Date().toDateString()}</span></h5>
        </Paper>
        <Paper className="message-box" onClick={handleOpenMessage}>
            <Checkbox aria-label="Checkbox demo" color="warning" icon={<GradeOutlinedIcon />} checkedIcon={<GradeIcon />} />
            <h5>Hi! How are you? Are you coming here. <span className='message-date'>{new Date().toDateString()}</span></h5>
        </Paper>
        <Paper className="message-box">
            <Checkbox aria-label="Checkbox demo" color="warning" icon={<GradeOutlinedIcon />} checkedIcon={<GradeIcon />} />
            <h5>Hi! How are you? Are you coming here. <span className='message-date'>{new Date().toDateString()}</span></h5>
        </Paper>
        <Paper className="message-box">
            <Checkbox aria-label="Checkbox demo" color="warning" icon={<GradeOutlinedIcon />} checkedIcon={<GradeIcon />} />
            <h5>Hi! How are you? Are you coming here. <span className='message-date'>{new Date().toDateString()}</span></h5>
        </Paper>
    </div>
  )
}
