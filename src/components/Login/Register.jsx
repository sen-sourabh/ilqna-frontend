import React, { Fragment, useEffect, useState } from 'react';
//UI
import { Paper, Stack, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
//Routers
import { Link, useNavigate } from 'react-router-dom';
//SCSS
import '../../sass/login.scss';
//Component
// import LoginBg from '../backgrounds/LoginBg';
//Icons
import InfoIcon from '@mui/icons-material/Info';

import * as functions from '../../functions/common/common';
import Email from '../../functions/validations/email';
import Password from '../../functions/validations/password';
import Phone from '../../functions/validations/phone';
import { useDispatch } from 'react-redux';
import { signUpWithEmailAndPassword } from '../../functions/APIs/login-api';
import { prepareSnackbar, resetSnackbar } from '../../redux/snackbarRedux/snackbar-slice';
import Loader from '../Loaders/loader';

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangePhone = (event) => {
    setPhone(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const isValid = () => {
    if (!Email.isValidEmail(email)) {
      dispatch(
        prepareSnackbar({ open: true, severity: 'error', message: 'Please enter a valid email.' }),
      );
      setTimeout(() => {
        dispatch(resetSnackbar());
      }, functions.snackbarTimer);
      return false;
    }
    if (!Password.isValidPassword(password)) {
      dispatch(
        prepareSnackbar({
          open: true,
          severity: 'error',
          message: 'Please enter a valid password.',
        }),
      );
      setTimeout(() => {
        dispatch(resetSnackbar());
      }, functions.snackbarTimer);
      return false;
    }
    if (!Phone.isValidPhone(phone)) {
      dispatch(
        prepareSnackbar({
          open: true,
          severity: 'error',
          message: 'Please enter a valid mobile no.',
        }),
      );
      setTimeout(() => {
        dispatch(resetSnackbar());
      }, functions.snackbarTimer);
      return false;
    }
    return true;
  };

  const handleClick = async () => {
    if (!isValid()) return false;
    setLoading(true);
    let newUserData = {
      username: functions.generatedUsernameByEmail(email),
      email,
      password,
      phone,
      ipAddress: localStorage.getItem('ipLocationData')
        ? JSON.parse(localStorage.getItem('ipLocationData')).ipAddress
        : null,
      location: localStorage.getItem('ipLocationData')
        ? JSON.parse(localStorage.getItem('ipLocationData')).location
        : null,
    };
    await signUpWithEmailAndPassword(newUserData)
      .then((res) => {
        signUpSuccess(res);
      })
      .catch((error) => {
        dispatch(prepareSnackbar({ open: true, severity: 'error', message: error.message }));
        setTimeout(() => {
          dispatch(resetSnackbar());
        }, functions.snackbarTimer);
        setLoading(false);
      });
  };

  const signUpSuccess = (res) => {
    setLoading(false);
    if (res.code === 200) {
      dispatch(prepareSnackbar({ open: true, severity: 'success', message: res.message }));
      setTimeout(() => {
        dispatch(resetSnackbar());
      }, functions.snackbarTimer);
      navigate('/login');
    } else {
      dispatch(prepareSnackbar({ open: true, severity: 'error', message: res.message }));
      setTimeout(() => {
        dispatch(resetSnackbar());
      }, functions.snackbarTimer);
    }
  };

  return (
    <Fragment>
      {isLoading && <Loader />}
      <Paper style={{ backgroundColor: 'transparent' }} className="login-window" elevation={12}>
        <Typography variant="h4" align="center">
          Register
        </Typography>
        <Typography variant="h6" align="center">
          Continue with us
        </Typography>
        <Typography variant="subtitle2" align="center">
          😃 You will get the answers here 😃
        </Typography>
        <Stack className="stack-style" spacing={{ xs: 2, md: 2 }}>
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            placeholder="example@example.com"
            onChange={handleChangeEmail}
            required
          />
          <TextField
            id="standard-basic"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="standard"
            onChange={handleChangePassword}
            required
          />
          <p position="end" className="show-password">
            <span onClick={handleClickShowPassword}>
              {showPassword ? 'Hide Password' : 'Show Password'}
            </span>
            <span>
              <InfoIcon className="info-icon" />
            </span>
          </p>
          <TextField
            id="standard-basic"
            label="Mobile No."
            variant="standard"
            onChange={handleChangePhone}
            required
          />
          <p position="end" className="show-password">
            <span>
              <InfoIcon className="info-icon" />
            </span>
          </p>
          <LoadingButton
            margin="normal"
            onClick={handleClick}
            loading={loading}
            variant="contained"
          >
            <b>SIGN UP</b>
          </LoadingButton>
          <div className="other-link">
            <Link to="/login">Log In?</Link>
          </div>
        </Stack>
      </Paper>
    </Fragment>
  );
}
