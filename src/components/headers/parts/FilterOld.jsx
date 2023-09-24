import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllQuestions } from '../../../functions/APIs/question-api';
import { openFilter } from '../../../redux/dialogRedux/filter-slice';
import { setQuestionData } from '../../../redux/questionRedux/question-slice';
import LoadingButton from '@mui/lab/LoadingButton';

export const Filter = ({ category = [], language = [] }) => {
  const dispatch = useDispatch();
  const { isOpen = false } = useSelector((state) => state.filter);
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userData } = useSelector((state) => state.login);
  const [languageDropdownVisibility, setLanguageDropdownVisibility] = useState(false);

  useEffect(() => {
    if (selectedLanguage.length === 0) {
      setLanguageDropdownVisibility(false);
    }
    // if(localStorage.getItem('filter')) {
    //   let filterData = JSON.parse(localStorage.getItem('filter'));
    //   setSearchInput(filterData.searchInput)
    //   setSelectedCategory(filterData.selectedCategory)
    //   setSelectedLanguage(filterData.selectedLanguage);
    // }
  }, []);

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const handleCategory = (newValue) => {
    let categoryIds = [];
    let tech = newValue.filter((val) => val.label === 'technology' || val.label === 'Technology');
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

  //On Apply Filter
  const handleSubmit = (e, type) => {
    e.preventDefault();
    setLoading(true);
    let body = {
      question: searchInput,
      categoryId: selectedCategory,
      languageId: selectedLanguage,
    };
    getFilterQuestion(body);
  };

  //On Reset Filter
  const handleResetFilter = () => {
    getFilterQuestion();
    setLanguageDropdownVisibility(false);
  };

  //API to get filter data
  const getFilterQuestion = async (body = {}) => {
    if (userData?._id) {
      body = { ...body, questionUserId: userData?._id };
    }
    const response = await fetchAllQuestions(body);
    dispatch(setQuestionData(response.data));
    dispatch(openFilter(false));
    setLoading(false);
    localStorage.filter = JSON.stringify(body);
  };

  return (
    <Dialog fullWidth open={isOpen} onClose={handleResetFilter}>
      <DialogTitle>Filter</DialogTitle>
      <DialogContent>
        <DialogContentText>Filter will be applied for current page...</DialogContentText>
        <TextField
          id="standard-basic"
          label="Search..."
          variant="standard"
          fullWidth
          className="filter-field"
          onChange={handleSearchInput}
          value={searchInput}
        />
        <Autocomplete
          className="input-control input-autocomplete"
          fullWidth
          multiple
          id="auto-category2"
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
          id="auto-language2"
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
      </DialogContent>
      <DialogActions>
        <LoadingButton onClick={handleResetFilter} loading={loading}>
          Cancel
        </LoadingButton>
        <LoadingButton variant="contained" loading={loading} onClick={handleSubmit}>
          Apply
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
