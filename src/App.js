import React, {useState} from 'react';
//Routers
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  // useNavigate
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
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

//SCSS
import './App.scss';
import './sass/main.scss';
import './sass/footer.scss';
//Component
// import Header from './components/headers/header';
import Register from './components/Login/Register';
import Login from './components/Login/Login';
import ForgotPassword from './components/Login/ForgotPassword';
import Home from './components/main/Home/Home';
import UserQuestions from './components/main/UserQuestions/UserQuestions';
import AddQuestion from './components/main/AddQuestion/AddQuestion';
import UserBookmarks from './components/main/UserBookmarks/UserBookmarks';
import User from './components/main/User/User';
import Verification from './components/Login/Verification';

function App() {
  // const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  

  // const logoutHandler = () => {
  //   setIsLogin(false);
  //   navigate('/');
  // }

  return (
    <div className="App">
      <Router>
        {/* <Header /> */}
        <div className='ilqna'>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/verification" element={<Verification />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route exact path="/user-questions" element={<UserQuestions />}></Route>
            <Route exact path="/add-question" element={<AddQuestion />}></Route>
            <Route exact path="/user-bookmark" element={<UserBookmarks />}></Route>
            <Route exact path="/user" element={<User />}></Route>
          </Routes>
        </div>
        {
          isLogin && 
            <Paper 
              style={{backgroundColor: 'transparent'}}
              className='footer-paper'
              elevation={12}
            >
                <BottomNavigation 
                  className='h-scroller' 
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
                  <Tooltip title="Notification" placement='top' arrow>
                    <Link className='nav-link' to="/user">
                      <BottomNavigationAction 
                        label="Notification"
                        className="footer-icon"
                        //value="notification"
                        icon={<NotificationsIcon />}
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
                  <Tooltip title="Logout" placement="top" arrow>
                    <Link className='nav-link' to="/">
                      <BottomNavigationAction
                        label="Logout"
                        className="footer-icon"
                        // value="favorites"
                        icon={<ExitToAppIcon />}
                      />
                    </Link>
                  </Tooltip>
                </BottomNavigation>
            </Paper>
        }
      </Router>
    </div>
  );
}

export default App;
