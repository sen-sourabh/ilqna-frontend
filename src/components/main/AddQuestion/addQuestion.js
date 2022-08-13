import React, { useState } from 'react';
//UI
import { Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
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
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

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

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <div className='ilqna-main'>
      <Typography variant='h5' align='left'>ASK</Typography>
      <Typography variant='subtitle1' align='left'>Ask questions from here. Hope, You will get answer soon...</Typography>
      <Grid container spacing={2} column={12}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
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
              <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
                wrapperStyle={{width: '100%', height: 'auto', border: '1px solid lightgrey', cursor: 'text', zIndex: '99', backgroundColor: 'white'}}
              />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Stack
            className='stack-style'
            spacing={{ xs: 2, md: 2 }}
          >
            <TextField
              fullWidth
              id="select-category"
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
              id="select-language"
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
                onClick={handleClickSave}
                // endIcon={<LoginIcon />}
                loading={loadingSave}
                // loadingPosition="end"
                variant="text"
                fullWidth
                disabled={clickOnOne}
              >
                <b>SAVE</b>
              </LoadingButton>
              <LoadingButton
                margin="normal" 
                onClick={handleClickAsk}
                // endIcon={<LoginIcon />}
                loading={loadingAsk}
                // loadingPosition="end"
                variant="contained"
                fullWidth
                disabled={clickOnOne}
              >
                <b>ASK</b>
              </LoadingButton>
            </div>
          </Stack>
        </Grid>
      </Grid>
    </div>
  )
}
