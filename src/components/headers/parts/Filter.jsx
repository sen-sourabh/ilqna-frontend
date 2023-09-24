import {
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllQuestions } from '../../../functions/APIs/question-api';
import {
  openFilter,
  setSearchInput,
  setSelectedCategory,
  setSelectedLanguage,
} from '../../../redux/dialogRedux/filter-slice';
import { setQuestionData } from '../../../redux/questionRedux/question-slice';
import LoadingButton from '@mui/lab/LoadingButton';
import ClearIcon from '@mui/icons-material/Clear';
import { Stack } from '@mui/system';
import '../../../sass/home.scss';
import '../../../sass/filter.scss';
import { fetchAllBookmarkQuestions } from '../../../functions/APIs/bookmark-api';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Filter = ({ category = [], language = [] }) => {
  const dispatch = useDispatch();
  const {
    isOpen = false,
    searchInput,
    selectedCategory,
    selectedLanguage,
  } = useSelector((state) => state.filter);
  const [loading, setLoading] = useState(false);
  const { userData } = useSelector((state) => state.login);

  useEffect(() => {
    if (localStorage.getItem('filter')) {
      dispatch(setSearchInput(''));
      dispatch(setSelectedCategory([]));
      dispatch(setSelectedLanguage([]));
    }
  }, []);

  const handleSearchInput = (event) => {
    dispatch(setSearchInput(event.target.value));
  };

  //On Apply Filter
  const handleSubmit = () => {
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
    dispatch(setSearchInput(''));
    dispatch(setSelectedCategory([]));
    dispatch(setSelectedLanguage([]));
    handleClearCategoryFilter();
    handleClearLanguageFilter();
  };

  //API to get filter data
  const getFilterQuestion = async (body = {}) => {
    let response;
    if (userData?._id && window.location.pathname.includes('/user-questions')) {
      body = { ...body, questionUserId: userData?._id };
      response = await fetchAllQuestions(body);
    } else if (userData?._id && window.location.pathname.includes('/user-bookmark')) {
      body = { ...body, questionUserId: userData?._id };
      response = await fetchAllBookmarkQuestions(body);
    } else {
      response = await fetchAllQuestions(body);
    }
    dispatch(setQuestionData(response.data));
    dispatch(openFilter(false));
    setLoading(false);
    localStorage.filter = JSON.stringify(body);
  };

  const handleSelectCategory = (cat, index) => {
    console.log('handleSelectCategory: ', cat);
    if (selectedCategory.includes(cat.value)) {
      category[index].selected = false;
      dispatch(setSelectedCategory(selectedCategory.filter((x) => cat.value != x)));
    } else {
      category[index].selected = true;
      dispatch(setSelectedCategory([...selectedCategory, cat.value]));
    }
  };

  const handleSelectLanguage = (lang, index) => {
    console.log('handleSelectLanguage: ', lang);
    if (selectedLanguage.includes(lang.value)) {
      language[index].selected = false;
      dispatch(setSelectedLanguage(selectedLanguage.filter((x) => lang.value != x)));
    } else {
      language[index].selected = true;
      dispatch(setSelectedLanguage([...selectedLanguage, lang.value]));
    }
  };

  const handleClearCategoryFilter = () => {
    console.log('handleClearCategoryFilter');
    category.forEach((cat) => {
      cat.selected = false;
    });
    dispatch(setSelectedCategory([]));
  };

  const handleClearLanguageFilter = () => {
    console.log('handleClearLanguageFilter');
    language.map((lang) => {
      lang.selected = false;
    });
    dispatch(setSelectedLanguage([]));
  };

  return (
    <Dialog
      fullScreen
      className="filter-dialog"
      open={isOpen}
      onClose={handleResetFilter}
      TransitionComponent={Transition}
    >
      <div className="filter-dialog-box">
        <DialogTitle className="left-header-content">
          <Typography variant="h5" align="left" className="main-filter-name">
            Filter
          </Typography>
          <DialogContentText className="main-filter-caption">
            Filter will be applied for current page...
          </DialogContentText>
        </DialogTitle>
        <DialogActions className="right-header-content">
          <LoadingButton onClick={handleResetFilter} loading={loading}>
            Reset
          </LoadingButton>
          <LoadingButton variant="contained" loading={loading} onClick={handleSubmit}>
            Apply
          </LoadingButton>
        </DialogActions>
      </div>
      <DialogContent className="filter-content-data">
        <TextField
          id="standard-basic"
          label="Search with text..."
          variant="standard"
          fullWidth
          className="filter-field"
          onChange={handleSearchInput}
          value={searchInput}
        />
        {category.length != 0 && (
          <Typography variant="h6" align="left" className="filter-head">
            Category{' '}
            <span>
              {selectedCategory}
              <ClearIcon className="filter-clear" onClick={() => handleClearCategoryFilter()} />
            </span>
          </Typography>
        )}
        <Stack direction="row" style={{ display: 'block' }}>
          {category.length > 0 &&
            category.map((cat, index) => {
              return (
                <Chip
                  key={cat.value}
                  id={cat.value}
                  label={cat.label}
                  className={
                    cat.selected ? 'filter-chip active-filter' : 'filter-chip inactive-filter'
                  }
                  variant="outlined"
                  onClick={() => handleSelectCategory(cat, index)}
                />
              );
            })}
        </Stack>
        {language.length != 0 && (
          <Typography variant="h6" align="left" className="filter-head">
            Language{' '}
            <span>
              {selectedLanguage}
              <ClearIcon className="filter-clear" onClick={() => handleClearLanguageFilter()} />
            </span>
          </Typography>
        )}
        <Stack direction="row" style={{ display: 'block' }}>
          {language.length > 0 &&
            language.map((lang, index) => {
              return (
                <Chip
                  key={lang.value}
                  id={lang.value}
                  className={
                    lang.selected ? 'filter-chip active-filter' : 'filter-chip inactive-filter'
                  }
                  label={lang.label}
                  variant="outlined"
                  onClick={() => handleSelectLanguage(lang, index)}
                />
              );
            })}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
