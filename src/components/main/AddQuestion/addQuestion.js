import React, { useState } from 'react';
//UI
import { Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
// import MUIRichTextEditor from 'mui-rte';
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
  const [loadingAsk, setLoadingAsk] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [clickOnOne, setClickOnOne] = useState(false);
  const [category, setCategory] = useState('EUR');
  const [language, setLanguage] = useState('EUR');

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  }

  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
  }

  const handleClickAsk = () => {
    setClickOnOne(true);
    setLoadingAsk(true);
  }

  const handleClickSave = () => {
    setClickOnOne(true);
    setLoadingSave(true);
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
                required
              />
              <TextField
                id="standard-basic" 
                label="whatYouHaveTried" 
                variant="standard"
              />
              {/* <MUIRichTextEditor label="Start typing..." /> */}
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
            <div className='btn-ask'>
              <LoadingButton
                margin="normal" 
                onClick={handleClickAsk}
                // endIcon={<LoginIcon />}
                loading={loadingAsk}
                loadingPosition="end"
                variant="contained"
                fullWidth
                disabled={clickOnOne}
              >
                <b>ASK</b>
              </LoadingButton>
              <LoadingButton
                margin="normal" 
                onClick={handleClickSave}
                // endIcon={<LoginIcon />}
                loading={loadingSave}
                loadingPosition="end"
                variant="text"
                fullWidth
                disabled={clickOnOne}
              >
                <b>SAVE</b>
              </LoadingButton>
            </div>
          </Stack>
        </Grid>
      </Grid>
    </div>
  )
}
