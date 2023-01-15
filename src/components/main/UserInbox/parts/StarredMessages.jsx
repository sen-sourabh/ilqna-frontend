import { Checkbox, Chip, Paper } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { openShowMessage } from '../../../../redux/dialogRedux/show-message-slice';
import '../../../../sass/inbox-messages.scss';

import GradeIcon from '@mui/icons-material/Grade';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';

export const StarredMessages = () => {
    const dispatch = useDispatch();
    const handleOpenMessage = (e) => {
        if(!e.target.hasOwnProperty('checked')) {
            dispatch(openShowMessage(true))
        }
    }

  return (
    <div>
        <Paper className="message-box" onClick={handleOpenMessage}>
            <Checkbox aria-label="Checkbox demo" color="warning" checked icon={<GradeOutlinedIcon />} checkedIcon={<GradeIcon />} />
            <h5>Hi! Can you please check this. It's very Urgent
                <span className='message-date'>
                    { new Date().toDateString() === new Date().toDateString() && <Chip size="small" label="new" className='new-badge'/> }    
                    {new Date().toDateString()}
                </span>
            </h5>
        </Paper>
        <Paper className="message-box" onClick={handleOpenMessage}>
            <Checkbox aria-label="Checkbox demo" color="warning" checked icon={<GradeOutlinedIcon />} checkedIcon={<GradeIcon />} />
            <h5>Hi! Can you please check this. It's very Urgent <span className='message-date'>{new Date().toDateString()}</span></h5>
        </Paper>
        <Paper className="message-box" onClick={handleOpenMessage}>
            <Checkbox aria-label="Checkbox demo" color="warning" checked icon={<GradeOutlinedIcon />} checkedIcon={<GradeIcon />} />
            <h5>Hi! Can you please check this. It's very Urgent <span className='message-date'>{new Date().toDateString()}</span></h5>
        </Paper>
        <Paper className="message-box" onClick={handleOpenMessage}>
            <Checkbox aria-label="Checkbox demo" color="warning" checked icon={<GradeOutlinedIcon />} checkedIcon={<GradeIcon />} />
            <h5>Hi! Can you please check this. It's very Urgent <span className='message-date'>{new Date().toDateString()}</span></h5>
        </Paper>
        <Paper className="message-box" onClick={handleOpenMessage}>
            <Checkbox aria-label="Checkbox demo" color="warning" checked icon={<GradeOutlinedIcon />} checkedIcon={<GradeIcon />} />
            <h5>Hi! Can you please check this. It's very Urgent <span className='message-date'>{new Date().toDateString()}</span></h5>
        </Paper>
        <Paper className="message-box" onClick={handleOpenMessage}>
            <Checkbox aria-label="Checkbox demo" color="warning" checked icon={<GradeOutlinedIcon />} checkedIcon={<GradeIcon />} />
            <h5>Hi! Can you please check this. It's very Urgent <span className='message-date'>{new Date().toDateString()}</span></h5>
        </Paper>
        <Paper className="message-box">
            <Checkbox aria-label="Checkbox demo" color="warning" checked icon={<GradeOutlinedIcon />} checkedIcon={<GradeIcon />} />
            <h5>Hi! Can you please check this. It's very Urgent <span className='message-date'>{new Date().toDateString()}</span></h5>
        </Paper>
        <Paper className="message-box">
            <Checkbox aria-label="Checkbox demo" color="warning" checked icon={<GradeOutlinedIcon />} checkedIcon={<GradeIcon />} />
            <h5>Hi! Can you please check this. It's very Urgent <span className='message-date'>{new Date().toDateString()}</span></h5>
        </Paper>
    </div>
  )
}
