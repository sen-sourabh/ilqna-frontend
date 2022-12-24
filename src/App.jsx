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

function App() {
  const { isLogin, userData } = useSelector(state => state.login);
  const [category, setCategory] = useState([]);
  const [language, setLanguage] = useState([]);

  useEffect(() => {
    getAllCategories();
    getAllLanguages();
  }, [isLogin])

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
          isLogin &&
          <Header />
        }
        {/* Body */}
          <Routes>
            {!isLogin && <Route path="/" element={<Login />}></Route>}
            {!isLogin && <Route path="/register" element={<Register />}></Route>}
            {!isLogin && <Route path="/forgot-password" element={<ForgotPassword />}></Route>}
            {isLogin && <Route path="/home" element={<Home />}></Route>}
            {isLogin && <Route path="/qna" element={<QNA />}></Route>}
            {isLogin && <Route exact path="/user-questions" element={<UserQuestions />}></Route>}
            {isLogin && <Route exact path="/add-question" element={<AddQuestion category={category} language={language} />}></Route>}
            {isLogin && <Route exact path="/user-bookmark" element={<UserBookmarks />}></Route>}
            {isLogin && <Route exact path="/notification" element={<Notifications />}></Route>}
            {isLogin && <Route exact path="/user" element={<User />}></Route>}
          </Routes>
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
                  <Tooltip title="Home" placement="top" arrow>
                    <Link className='nav-link' to="/home">
                      <BottomNavigationAction
                        label="Home"
                        className="footer-icon"
                        icon={<HomeIcon />}
                      />
                    </Link>
                  </Tooltip>
                  <Tooltip title="Asked By You" placement="top" arrow>
                    <Link className='nav-link' to="/user-questions">
                      <BottomNavigationAction 
                        label="QuestionAnswer" 
                        className="footer-icon"
                        icon={<QuestionAnswerIcon />} 
                      />
                    </Link>
                  </Tooltip>
                  <Tooltip title="You Can Ask" placement="top" arrow>
                    <Link className='nav-link' to="/add-question">
                      <BottomNavigationAction
                        label="AddBox"
                        className="footer-icon"
                        icon={<AddBoxIcon />}
                      />
                    </Link>
                  </Tooltip>
                  <Tooltip title="You" placement="top" arrow>
                    <Link className='nav-link' to="/user">
                      <BottomNavigationAction
                        label="Person"
                        className="footer-icon"
                        icon={<PersonIcon />}
                      />
                    </Link>
                  </Tooltip>
                </BottomNavigation>
            </Paper>
        }
        <Verification />
        <Messages />
        <UpdateUsername />
        <ChangePassword email={userData.email} />
        <Filter category={category} language={language} />
        <About />
      </Router>
    </div>
  );
}

export default App;
