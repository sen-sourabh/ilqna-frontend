import { Autocomplete, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllQuestions } from '../../../functions/APIs/question-api';
import { openFilter } from '../../../redux/dialogRedux/filter-slice';
import { setQuestionData } from '../../../redux/questionRedux/question-slice';
import LoadingButton from '@mui/lab/LoadingButton';
import { LocalConvenienceStoreOutlined } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import { Stack } from '@mui/system';
import '../../../sass/home.scss'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Filter = ({ category = [], language = [] }) => {
    const dispatch = useDispatch();
    const { isOpen = false } = useSelector(state => state.filter);
    const [searchInput, setSearchInput] = useState('')
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState([]);
    const [loading, setLoading] = useState(false);
    const { userData } = useSelector(state => state.login);
    const [languageDropdownVisibility, setLanguageDropdownVisibility] = useState(false)
  
    useEffect(() => {
      // console.log("USEEFFECT")
      if(selectedLanguage.length === 0){
        setLanguageDropdownVisibility(false);
      }
      if(localStorage.getItem('filter')) {
        // console.log("clera")
        setSearchInput('')
        setSelectedCategory([])
        setSelectedLanguage([])
      }
    }, [])
    

    const handleSearchInput = (event) => {
      setSearchInput(event.target.value)
    }
  
    //On Apply Filter
    const handleSubmit = () => {
      // e.preventDefault();
      setLoading(true)
      let body = {
        question: searchInput,
        categoryId: selectedCategory,
        languageId: selectedLanguage
      }
      getFilterQuestion(body);
    }

    //On Reset Filter
    const handleResetFilter = () => {
      getFilterQuestion();
      setSearchInput('')
      setSelectedCategory([])
      setSelectedLanguage([])
      handleClearCategoryFilter()
      handleClearLanguageFilter()
      setLanguageDropdownVisibility(false);
    }

    //API to get filter data
    const getFilterQuestion = async (body = {}) => {
      if(userData?._id && window.location.pathname.includes('/user-questions')) {
        body = {...body, questionUserId: userData?._id}
      }
      const response = await fetchAllQuestions(body);
      dispatch(setQuestionData(response.data))
      dispatch(openFilter(false));
      setLoading(false)
      localStorage.filter = JSON.stringify(body);
    }



    const handleSelectCategory = (cat, index) => {
      console.log("handleSelectCategory: ", cat)
      if(selectedCategory.includes(cat.value)) {
        category[index].selected = false
        setSelectedCategory(selectedCategory.filter(x => cat.value != x));
        
      } else {
        category[index].selected = true
        setSelectedCategory([...selectedCategory, cat.value ]);
      }
    }

    const handleSelectLanguage = (lang, index) => {
      console.log("handleSelectLanguage: ", lang)
      if(selectedLanguage.includes(lang.value)) {
        language[index].selected = false
        setSelectedLanguage(selectedLanguage.filter(x => lang.value != x));
      } else {
        language[index].selected = true
        setSelectedLanguage([...selectedLanguage, lang.value ]);
      }
    }

    const handleClearCategoryFilter = () => {
      console.log("handleClearCategoryFilter")
      category.forEach((cat) => {
        cat.selected = false
      })
      setSelectedCategory([])
    }

    const handleClearLanguageFilter = () => {
      console.log("handleClearLanguageFilter")
      language.map((lang) => {
        lang.selected = false
      })
      setSelectedLanguage([]);
    }


  return (
    <Dialog 
       
        fullScreen
        style={{marginTop: '20%', maxHeight: '60%'}}
        className="filter-dialog"
        open={isOpen}
        onClose={handleResetFilter}
        TransitionComponent={Transition}
    >
        <div style={{display: 'inline-flex', zIndex: '99999999', boxShadow: '0px 10px 13px 0px rgb(0 0 0 / 10%)'}}>
          <DialogTitle style={{width: '50%' }}>
            <Typography variant='h5' align='left'>Filter</Typography>
            <DialogContentText>
                Filter will be applied for current page...
            </DialogContentText>
          </DialogTitle>
          <DialogActions style={{float: 'right', width: '44%' }}>
              <LoadingButton 
                onClick={handleResetFilter}
                loading={loading}
              >
                Reset
              </LoadingButton>
              <LoadingButton 
                variant="contained"
                loading={loading} 
                onClick={handleSubmit}
              >
                Apply
              </LoadingButton>
          </DialogActions>
        </div>
        <DialogContent style={{paddingTop: '0px', overflowX: 'hidden'}}>            
            <TextField 
                id="standard-basic" 
                label="Search with text..." 
                variant="standard"
                fullWidth
                className='filter-field'
                onChange={handleSearchInput}
                value={searchInput}
            />
            { 
              category.length != 0 && 
              <Typography 
                variant='h6' 
                align='left' 
                className='filter-head'
              >
                Category <span>
                          {selectedCategory}
                          <ClearIcon className='filter-clear' onClick={() => handleClearCategoryFilter()}/>
                        </span>
              </Typography>}
            <Stack direction="row" style={{display: 'block'}}>
              {
                category.length > 0 && category.map((cat, index) => {
                  return (
                    <Chip 
                      key={cat.value}
                      id={cat.value}
                      label={cat.label} 
                      className={cat.selected ? 'filter-chip active-filter' : 'filter-chip inactive-filter'}
                      variant="outlined" 
                      onClick={() => handleSelectCategory(cat, index)}
                    />
                  )
                }) 
              }
              </Stack>
              {
                language.length != 0 && 
                  <Typography 
                    variant='h6' 
                    align='left' 
                    className='filter-head'
                  >
                    Language <span>
                              {selectedLanguage}
                              <ClearIcon className='filter-clear' onClick={() => handleClearLanguageFilter()}/>
                            </span>
                  </Typography>}
              <Stack direction="row" style={{display: 'block'}}>
                {
                  language.length > 0 && language.map((lang, index) => {
                    return (
                      <Chip 
                        key={lang.value}
                        id={lang.value}
                        className={lang.selected ? 'filter-chip active-filter' : 'filter-chip inactive-filter'}
                        label={lang.label} 
                        variant="outlined" 
                        onClick={() => handleSelectLanguage(lang, index)}
                      />
                    )
                  }) 
                }
              </Stack>
        </DialogContent>
    </Dialog>
  )
}
