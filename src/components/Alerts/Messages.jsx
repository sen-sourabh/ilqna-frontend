import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';

export const Messages = () => {
  const {isOpen, severity, message} = useSelector(state => state.snackbar);

  return (
    <Snackbar open={isOpen} autoHideDuration={3000}>
        <Alert severity={severity} sx={{ width: '100%' }} elevation={6} variant="filled">
          { message }
        </Alert>
    </Snackbar>
  )
}
