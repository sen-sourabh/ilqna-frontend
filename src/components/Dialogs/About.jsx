import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'
import { openAbout } from '../../redux/dialogRedux/about-slice';
import LOGO from '../../images/Team Q&A-2.png'
import { useDispatch, useSelector } from 'react-redux';
import '../../sass/about.scss';

export const About = () => {
    const dispatch = useDispatch();
    const { isOpen } = useSelector(state => state.about);
    
    const handleCloseAbout = () => {
        dispatch(openAbout(false));
    }

  return (
    <Dialog open={isOpen} onClose={handleCloseAbout}>
        <DialogTitle>ILQNA <span className='version-info'>V1.0.0</span></DialogTitle>
        <DialogContent>
            <DialogContentText>
            <img className='about-body' src={LOGO} alt='LOGO' />
            {/* <SelfImprovementIcon className='about-icon' /> */}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseAbout}>Close</Button>
        </DialogActions>
    </Dialog>
  )
}
