import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { openFilter } from '../../../redux/dialogRedux/filter-slice';

export const Filter = ({ category = [], language = [] }) => {
    const dispatch = useDispatch();
    const { isOpen = false } = useSelector(state => state.filter);
    const [searchInput, setSearchInput] = useState('')
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState([]);
  
    const handleSearchInput = (event) => {
      setSearchInput(event.target.value)
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
        searchInput,
        selectedCategory,
        selectedLanguage
      );
      setTimeout(() =>{
        handleCloseFilter();
      }, 1000);
    }

    const handleCloseFilter = () => {
        dispatch(openFilter(false));
    }

  return (
    <Dialog 
        open={isOpen}
        onClose={handleCloseFilter}
    >
        <DialogTitle>Filter</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Filter will be applied for current page...
            </DialogContentText>
            <TextField 
                id="standard-basic" 
                label="Search..." 
                variant="standard"
                fullWidth
                className='filter-field'
                onChange={handleSearchInput}
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
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseFilter}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit}>Apply</Button>
        </DialogActions>
    </Dialog>
  )
}
