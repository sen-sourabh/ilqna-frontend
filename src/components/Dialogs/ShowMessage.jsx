import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openShowMessage } from '../../redux/dialogRedux/show-message-slice';
import '../../sass/show-message.scss';

export const ShowMessage = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.show_message);
  const [scroll, setScroll] = useState('paper');

  const handleClose = () => {
    dispatch(openShowMessage(false));
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      scroll={scroll}
      fullWidth
      maxHeight="lg"
      maxWidth="lg"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">
        Hi! How are you? Are you coming here...{' '}
        <span className="show-message-date">{new Date().toDateString()}</span>
      </DialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis
          consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
          eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo
          cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet
          fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus,
          porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
          scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras
          justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
          consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus
          ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum
          at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
