import React, { Fragment, useEffect, useState } from 'react';
//UI
import { Autocomplete, Button, Grid, TextField, Typography } from '@mui/material';
//SCSS
import '../../../sass/add-question.scss';
// import '../../../sass/main.scss';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import { addQuestion } from '../../../functions/APIs/question-api';
import * as functions from '../../../functions/common/common';
import { isEmpty } from '../../../functions/common/common';
import { prepareSnackbar, resetSnackbar } from '../../../redux/snackbarRedux/snackbar-slice';
import Loader from '../../Loaders/loader';
import { NeatEditor } from '../../NeatEditor/NeatEditor';

export default function AddQuestion({ category = [], language = [] }) {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [languageDropdownVisibility, setLanguageDropdownVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editorValue, setEditorValue] = useState('Add question description here...');

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleQuestion = (event) => {
    setQuestion(event.target.value);
  };

  const handleCategory = (newValue) => {
    let categoryIds = [];
    let tech = newValue.filter(
      (val) => val.label.includes('technology') || val.label.includes('Technology'),
    );
    if (tech.length) {
      setLanguageDropdownVisibility(true);
    } else {
      setLanguageDropdownVisibility(false);
    }
    newValue.map((val) => {
      categoryIds = [...categoryIds, { _id: val.value }];
    });
    setSelectedCategory(categoryIds);
  };

  const handleLanguage = (newValue) => {
    let languageIds = [];
    newValue.map((val) => {
      languageIds = [...languageIds, { _id: val.value }];
    });
    setSelectedLanguage(languageIds);
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    if (isEmpty(question)) {
      setIsLoading(true);
      var desc = document.getElementById('ilqna-editor');
      let body = {
        draft: type === 'draft' ? true : false,
        question,
        whatYouHaveTried:
          desc.innerHTML === 'Add question description here...' || desc.innerHTML === ''
            ? ''
            : desc.innerHTML,
        categoryId: selectedCategory,
        languageId: selectedLanguage,
        questionUserId: JSON.parse(localStorage.getItem('userData'))._id,
        ipAddress: localStorage.getItem('ipLocationData')
          ? JSON.parse(localStorage.getItem('ipLocationData')).ipAddress
          : '',
        location: localStorage.getItem('ipLocationData')
          ? JSON.parse(localStorage.getItem('ipLocationData')).location
          : '',
      };
      const response = await addQuestion(body);
      if (response.code !== 200 && response.status !== 'OK') {
        dispatch(prepareSnackbar({ open: true, severity: 'error', message: response.message }));
        setTimeout(() => {
          dispatch(resetSnackbar());
        }, functions.snackbarTimer);
        setIsLoading(false);
      } else {
        dispatch(prepareSnackbar({ open: true, severity: 'success', message: response.message }));
        setTimeout(() => {
          dispatch(resetSnackbar());
        }, functions.snackbarTimer);
        handleClearForm();
        setIsLoading(false);
      }
    } else {
      dispatch(
        prepareSnackbar({ open: true, severity: 'error', message: 'Question is required.' }),
      );
      setTimeout(() => {
        dispatch(resetSnackbar());
      }, functions.snackbarTimer);
    }
  };

  const handleClearForm = () => {
    setQuestion('');
    setSelectedCategory([]);
    setSelectedLanguage([]);
    setLanguageDropdownVisibility(false);
    var desc = document.getElementById('ilqna-editor');
    desc.innerHTML = 'Add question description here...';
  };

  return (
    <Fragment>
      {isLoading && <Loader />}
      <div className="ilqna-main">
        <Box mt={2} className="add-question">
          <Typography variant="h5" align="left">
            <b>ASK</b>
          </Typography>
          <Typography variant="subtitle1" align="left">
            Ask questions from here. Hope, You will get answer soon...
          </Typography>
          <TextField
            className="input-control"
            id="outlined-basic"
            label="Question"
            variant="outlined"
            placeholder="Why you are human?"
            fullWidth
            value={question}
            onChange={handleQuestion}
          />
          <NeatEditor customId="ilqna-editor" defaultValue={editorValue} />
          <Autocomplete
            className="input-control input-autocomplete"
            fullWidth
            multiple
            id="auto-category"
            options={category}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Categories"
                placeholder={selectedCategory.length ? '' : 'Finance'}
              />
            )}
            onChange={(event, newValue) => {
              handleCategory(newValue);
            }}
          />
          <Autocomplete
            fullWidth
            className="input-control input-autocomplete"
            multiple
            id="auto-language"
            options={language}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Languages"
                placeholder={selectedLanguage.length ? '' : 'Java'}
              />
            )}
            style={{ display: languageDropdownVisibility ? 'block' : 'none' }}
            onChange={(event, newValue) => {
              handleLanguage(newValue);
            }}
          />
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
            <Grid item xs={4}>
              <Button
                className="input-control"
                variant="text"
                fullWidth
                color="error"
                onClick={handleClearForm}
              >
                Clear
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                className="input-control"
                variant="outlined"
                fullWidth
                onClick={(e) => handleSubmit(e, 'draft')}
              >
                Draft
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                className="input-control"
                variant="contained"
                fullWidth
                onClick={(e) => handleSubmit(e, 'ask')}
              >
                Ask
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Fragment>
  );
}
