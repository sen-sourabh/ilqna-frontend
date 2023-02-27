import { Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { snackbarTimer } from '../../../functions/common/common';
import { prepareSnackbar, resetSnackbar } from '../../../redux/snackbarRedux/snackbar-slice';
import '../../../sass/home.scss';

export const NotFoundByFilter = () => {
    const dispatch = useDispatch();
    const { questionData } = useSelector(state => state.question);
    const { searchInput, selectedCategory, selectedLanguage } = useSelector(state => state.filter);
    
    useEffect(() => {
      checkFilterApplied();
    }, [])

    const checkFilterApplied = () => {
        if((searchInput || selectedCategory.length > 0 || selectedLanguage.length > 0) && questionData.length === 0) {
          return true;
        } 
        return false;
    }

    const handleNotifyUs= () => {
        dispatch(prepareSnackbar({ open: true, severity: 'success', message: 'Thanks for Notify us.' }))
        setTimeout(() => { dispatch(resetSnackbar()) }, snackbarTimer)
        console.log("Thanks for Notify us.");
    }

  return (
    <div>
        { 
            checkFilterApplied() &&
                <div className="question-list" >
                    <Typography variant="h2" className='no-question' >
                    Sorry! Didn't found any questions with this filter.
                        <Typography variant='h6' className='notify-question' onClick={() => handleNotifyUs()}>
                        Let us notify about your search...
                        </Typography>
                    </Typography>
                </div>
        }
    </div>
  )
}
