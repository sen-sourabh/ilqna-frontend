import * as React from 'react';
//Routers
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
//UI
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Tooltip from '@mui/material/Tooltip';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AddBoxIcon from '@mui/icons-material/AddBox';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FilterListIcon from '@mui/icons-material/FilterList';
import SettingsIcon from '@mui/icons-material/Settings';

//SCSS
import './App.scss';
import './sass/main.scss';
import './sass/footer.scss';
//Component
// import Header from './components/headers/header';
import Register from './components/Login/register';
import Login from './components/Login/login';
import ForgotPassword from './components/Login/forgotPassword';
import Home from './components/main/Home/home';
import UserQuestions from './components/main/UserQuestions/userQuestions';
import AddQuestion from './components/main/AddQuestion/addQuestion';
import UserBookmarks from './components/main/UserBookmarks/userBookmarks';
import User from './components/main/User/user';

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Header /> */}
        <div className='ilqna'>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route exact path="/user-questions" element={<UserQuestions />}></Route>
            <Route exact path="/add-question" element={<AddQuestion />}></Route>
            <Route exact path="/user-bookmark" element={<UserBookmarks />}></Route>
            <Route exact path="/user" element={<User />}></Route>
          </Routes>
        </div>
        <div className='footer'>
          <Paper sx={{ position: 'fixed',bottom: '-4px',left: 0,right: 0 }} elevation={12}>
              <BottomNavigation 
                className='h-scroller' 
                
                // value={value} 
                // onChange={handleChange}  
              >
                <Tooltip title="Home" placement="top" arrow>
                  <Link className='nav-link' to="/home">
                    <BottomNavigationAction
                      label="Home"
                      className="footer-icon"
                      // value="recents"
                      icon={<HomeIcon />}
                    />
                  </Link>
                </Tooltip>
                <Tooltip title="Asked By You" placement="top" arrow>
                  <Link className='nav-link' to="/user-questions">
                    <BottomNavigationAction 
                      label="QuestionAnswer" 
                      className="footer-icon"
                      // value="folder" 
                      icon={<QuestionAnswerIcon />} 
                    />
                  </Link>
                </Tooltip>
                <Tooltip title="You Can Ask" placement="top" arrow>
                  <Link className='nav-link' to="/add-question">
                    <BottomNavigationAction
                      label="AddBox"
                      className="footer-icon"
                      // value="nearby"
                      icon={<AddBoxIcon />}
                    />
                  </Link>
                </Tooltip>
                <Tooltip title="Your Bookmarks" placement="top" arrow>
                  <Link className='nav-link' to="/user-bookmark">
                    <BottomNavigationAction 
                      label="Bookmark" 
                      className="footer-icon"
                      // value="folder" 
                      icon={<BookmarkIcon />} 
                    />
                  </Link>
                </Tooltip>
                <Tooltip title="You" placement="top" arrow>
                  <Link className='nav-link' to="/user">
                    <BottomNavigationAction
                      label="Person"
                      className="footer-icon"
                      // value="favorites"
                      icon={<PersonIcon />}
                    />
                  </Link>
                </Tooltip>
                <Tooltip title="Filter" placement="top" arrow>
                  <Link className='nav-link' to="/user">
                    <BottomNavigationAction
                      label="Filter"
                      className="footer-icon"
                      // value="favorites"
                      icon={<FilterListIcon />}
                    />
                  </Link>
                </Tooltip>
                <Tooltip title="Settings" placement="top" arrow>
                  <Link className='nav-link' to="/user">
                    <BottomNavigationAction
                      label="Settings"
                      className="footer-icon"
                      // value="favorites"
                      icon={<SettingsIcon />}
                    />
                  </Link>
                </Tooltip>
              </BottomNavigation>
          </Paper>
        </div>
      </Router>
    </div>
  );
}

export default App;
