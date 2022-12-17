import React, { useEffect, useState } from 'react';
//UI
import { Autocomplete, Button, Grid, TextField, Typography } from '@mui/material';
//SCSS
import '../../../sass/add-question.scss';
// import '../../../sass/main.scss';
import { Box } from '@mui/system';

export default function AddQuestion({ category = [], language = [] }) {
  const [loadingAsk, setLoadingAsk] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [clickOnOne, setClickOnOne] = useState(false);
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);

  const handleQuestion = (event) => {
    setQuestion(event.target.value)
  }

  const handleCategory = (newValue) => {
    setSelectedCategory(newValue);
  }

  const handleLanguage = (newValue) => {
    setSelectedLanguage(newValue);
  }

  const handleSubmit = (e, type) => {
    e.preventDefault();
    console.log(
      type,
      question,
      description,
      selectedCategory,
      selectedLanguage
    );
      
  }

  return (
    <div className='ilqna-main'>
      <Box mt={2} className='add-question'>
        <Typography variant='h5' align='left'><b>ASK</b></Typography>
        <Typography variant='subtitle1' align='left'>Ask questions from here. Hope, You will get answer soon...</Typography>
        <TextField
          className='input-control' 
          id="outlined-basic" 
          label="Question" 
          variant="outlined"
          placeholder='Why you are human?'
          fullWidth
          onChange={handleQuestion}
        />
        <TextField 
          className='input-control' 
          id="outlined-basic" 
          label="Question description" 
          variant="outlined"
          placeholder='Description...'
          fullWidth
          onChange={handleQuestion}
        />
        <Autocomplete
          className='input-control input-autocomplete'
          fullWidth
          multiple
          id="tags-outlined"
          options={category}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Categories"
              placeholder="Technology"
            />
          )}
          onChange={(event, newValue) => { handleCategory(newValue) }}
        />
        <Autocomplete
          fullWidth
          className='input-control input-autocomplete'
          multiple
          id="tags-outlined"
          options={language}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Languages"
              placeholder="Java"
            />
          )}
          onChange={(event, newValue) => { handleLanguage(newValue) }}
        />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
              <Button
                className='input-control'
                variant="text"
                fullWidth
                onClick={(e) => handleSubmit(e, 'save')}
              >
                Save
              </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              className='input-control'
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
  )
}
