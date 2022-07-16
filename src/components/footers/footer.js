import * as React from 'react';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// import FolderIcon from '@mui/icons-material/Folder';
// import RestoreIcon from '@mui/icons-material/Restore';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import LocationOnIcon from '@mui/icons-material/LocationOn';

import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
// import AddIcon from '@mui/icons-material/Add';
import AddBoxIcon from '@mui/icons-material/AddBox';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import '../../sass/footer.scss';

export default function footer() {
  // const [value, setValue] = React.useState('recents');

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  return (
    <div className='footer'>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation 
          sx={{ width: '100%' }} 
          // value={value} 
          // onChange={handleChange}  
        >
          <BottomNavigationAction
            label="Home"
            className="footer-icon"
            // value="recents"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            label="Person"
            className="footer-icon"
            // value="favorites"
            icon={<PersonIcon />}
          />
          <BottomNavigationAction
            label="AddBox"
            className="footer-icon"
            // value="nearby"
            icon={<AddBoxIcon />}
          />
          <BottomNavigationAction 
            label="QuestionAnswer" 
            className="footer-icon"
            // value="folder" 
            icon={<QuestionAnswerIcon />} 
          />
          <BottomNavigationAction 
            label="Bookmark" 
            className="footer-icon"
            // value="folder" 
            icon={<BookmarkIcon />} 
          />
        </BottomNavigation>
      </Paper>
    </div>
  )
}
