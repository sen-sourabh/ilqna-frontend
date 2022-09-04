import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const Messages = (props) => {
  const {open, severity, message} = props.options;
  return (
    <Snackbar open={open} autoHideDuration={2000}>
        <Alert severity={severity} sx={{ width: '100%' }} elevation={6} variant="filled">
          { message }
        </Alert>
    </Snackbar>
  )
}
