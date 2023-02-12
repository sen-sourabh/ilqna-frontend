import React, { useEffect, useState } from 'react';
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
//SCSS
import './App.scss';
import './sass/main.scss';
import './sass/footer.scss';
//Component
import Register from './components/Login/Register';
import Login from './components/Login/Login';
import { ForgotPassword } from './components/Login/ForgotPassword';
import Home from './components/main/Home/Home';
import UserQuestions from './components/main/UserQuestions/UserQuestions';
import AddQuestion from './components/main/AddQuestion/AddQuestion';
import UserBookmarks from './components/main/UserBookmarks/UserBookmarks';
import User from './components/main/User/User';
import Header from './components/headers/Header';
import Notifications from './components/main/Notifications/Notifications';
import QNA from './components/main/QNA/QNA';
import { useSelector } from 'react-redux';
import { Verification } from './components/Dialogs/Verification';
import { Messages } from './components/Alerts/Messages';
import { UpdateUsername } from './components/Dialogs/UpdateUsername';
import { ChangePassword } from './components/Dialogs/ChangePassword';
import { Filter } from './components/headers/parts/Filter';
import { getCategories } from './functions/APIs/category-api';
import { getLanguages } from './functions/APIs/language-api';
import { About } from './components/Dialogs/About';
import { UserInbox } from './components/main/UserInbox/UserInbox';
import { ShowMessage } from './components/Dialogs/ShowMessage';
import { ComposeMessage } from './components/Dialogs/ComposeMessage';
import { UserChat } from './components/main/UserChats/UserChat';
import { NeatEditor } from './components/NeatEditor/NeatEditor';
import { getGeoLocation, getIpAddress } from './functions/APIs/geolocation-api';
import { AppBar, Badge, Box, IconButton, Typography, Toolbar } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PhoneIcon from '@mui/icons-material/Phone';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ChatIcon from '@mui/icons-material/Chat';

function App() {
  const { isLogin, userData } = useSelector(state => state.login);
  const [category, setCategory] = useState([]);
  const [language, setLanguage] = useState([]);
  const authPages = ['/login', '/register', '/forgot-password'];

  console.log("window: ", isLogin, userData)

  useEffect(() => {
    getAllCategories();
    getAllLanguages();
    getIpAddress().then((ip) => {
      getGeoLocation(ip)
    }).catch((err) => {
      console.log("Error: ", err)
    });
  }, [])

  const getAllCategories = async () => {
    const response = await getCategories();
    setCategory(response.data)
  }

  const getAllLanguages = async () => {
    const response = await getLanguages();
    setLanguage(response.data)
  }

  return (
    <div className="App">
      <Router>
        {/* Header */}
        {
          <Header />
        }
        {/* Body */}
          {/* Before Login */}
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/register" element={<Register />}></Route>
              <Route exact path="/forgot-password" element={<ForgotPassword />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/qna" element={<QNA />}></Route>
            </Routes>
          {/* After Login */}
            {isLogin && <Routes>
              <Route exact path="/user-questions" element={<UserQuestions />}></Route>
              <Route exact path="/add-question" element={<AddQuestion category={category} language={language} />}></Route>
              <Route exact path="/user-bookmark" element={<UserBookmarks />}></Route>
              <Route exact path="/user-notification" element={<Notifications />}></Route>
              <Route exact path="/user" element={<User />}></Route>
              <Route exact path="/user-inbox" element={<UserInbox />}></Route>
              <Route exact path="/user-chats" element={<UserChat />}></Route>
            </Routes> }
        {/* Footer */}
        {
          isLogin && 
            <Paper
              className='footer-paper'
              elevation={12}
            > 
                <BottomNavigation 
                  className="h-scroller"
                >
                    <Link className='nav-link' to="/">
                      <BottomNavigationAction
                        label="Home"
                        className="footer-icon"
                        icon={<HomeIcon />}
                      />
                    </Link>
                    <Link className='nav-link' to="/user-questions">
                      <BottomNavigationAction 
                        label="QuestionAnswer" 
                        className="footer-icon"
                        icon={<QuestionAnswerIcon />} 
                      />
                    </Link>
                    <Link className='nav-link' to="/add-question">
                      <BottomNavigationAction
                        label="AddBox"
                        className="footer-icon"
                        icon={<AddBoxIcon />}
                      />
                    </Link>
                    <Link className='nav-link' to="/user">
                      <BottomNavigationAction
                        label="Person"
                        className="footer-icon"
                        icon={<PersonIcon />}
                      />
                    </Link>
                 </BottomNavigation>
            </Paper>
        }
        <Verification />
        <Messages />
        <UpdateUsername />
        <ChangePassword email={userData.email} />
        <Filter category={category} language={language} />
        <About />
        <ComposeMessage />
        <ShowMessage />
      </Router>
    </div>
  );
}

export default App;
