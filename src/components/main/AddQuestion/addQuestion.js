import React, { useState } from 'react';
//UI
import { Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/'
//SCSS
import '../../../sass/add-question.scss';
import '../../../sass/main.scss';


const categories = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

const languages = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

export default function AddQuestion() {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('EUR');
  const [language, setLanguage] = useState('EUR');

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  }

  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
  }

  const handleClick = () => {
    setLoading(true);
  }

  return (
    <div className='ilqna-main'>
      <Typography variant='h5' align='left'>ASK</Typography>
      <Typography variant='subtitle1' align='left'>Ask questions from here, definetly, You will get answers soon...</Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Stack
            className='stack-style'
            spacing={{ xs: 2, md: 2 }}
          >
              <TextField 
                id="standard-basic" 
                label="Question" 
                variant="standard"
              />
              <TextField
                id="standard-basic" 
                label="whatYouHaveTried" 
                variant="standard"
              />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack
            className='stack-style'
            spacing={{ xs: 2, md: 2 }}
          >
            <TextField
              fullWidth
              id="standard-select-currency"
              select
              label="Category"
              value={category}
              onChange={handleChangeCategory}
              variant="standard"
              required
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              id="standard-select-currency"
              select
              label="Language"
              value={language}
              onChange={handleChangeLanguage}
              variant="standard"
            >
              {languages.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <LoadingButton
              margin="normal" 
              onClick={handleClick}
              // endIcon={<LoginIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              <b>ASK</b>
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </div>
  )
}
