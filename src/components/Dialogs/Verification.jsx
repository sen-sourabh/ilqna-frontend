import React, { useEffect, useState } from 'react'
//UI
import { Tooltip, TextField, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeForm } from '../../redux/loginRedux/forgotPassword-slice';
import { isVerifyOpen, resetVerifyTimer, verifyTimer } from '../../redux/dialogRedux/verification-slice';
import { prepareSnackbar, resetSnackbar } from '../../redux/snackbarRedux/snackbar-slice';
import * as functions from '../../functions/common/common';

export const Verification = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [enterOTP, setEnterOTP] = useState();
	const { isVerifyOpen: isOpen, OTP } = useSelector(state => state.verification);
	const { verifyTimer: verifyTimerChange } = useSelector(state => state.verification);

	useEffect(() => {
		let timer;
		if(isOpen) {
		  timer = verifyTimerChange > 0 ? setInterval(() => dispatch(verifyTimer()), 1000) : handleAutoCloseVerify()
		}
		return () => { clearInterval(timer); }
	});

	const handleChangeOTP = (event) => {
		setEnterOTP(event.target.value);
	}

	const handleVerify = () => {
		if(enterOTP === OTP) {
			dispatch(isVerifyOpen(false));
			dispatch(resetVerifyTimer());
			dispatch(changeForm(false));
		} else {
			dispatch(prepareSnackbar({ open: true, severity: 'error', message: "Please enter valid OTP." }));
      		setTimeout(() => { dispatch(resetSnackbar()) }, functions.snackbarTimer)
		}
	}

	const handleAutoCloseVerify = () => {
		dispatch(isVerifyOpen(false));
		dispatch(resetVerifyTimer());
		navigate('/');
	}

  	return (
		<Dialog open={isOpen} onClose={handleAutoCloseVerify}>
			<DialogTitle>Verify</DialogTitle>
			<DialogContent>
			<DialogContentText>
				Please enter verification code to verify...
			</DialogContentText>
			<TextField
				autoFocus
				margin="dense"
				id="verify"
				label="Code"
				type="text"
				fullWidth
				variant="standard"
				onChange={handleChangeOTP}
				required
			/>
			</DialogContent>
			<DialogActions>
			<Tooltip title={`Try agian after ${ verifyTimerChange } seconds`} placement="top" arrow>
				<Typography variant='h6' style={{cursor: 'default', userSelect: 'none'}}>{ verifyTimerChange }</Typography>
			</Tooltip>
			<Button onClick={handleAutoCloseVerify}>Cancel</Button>
			<Button variant="contained" onClick={handleVerify}>Verify</Button>
			</DialogActions>
		</Dialog>
	)
}