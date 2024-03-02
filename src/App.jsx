import React, { useEffect, useState } from 'react';
//Routers
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
//UI
//SCSS
import './App.scss';
import './sass/footer.scss';
import './sass/main.scss';
//Component
import { useSelector } from 'react-redux';
import { Messages } from './components/Alerts/Messages';
import { About } from './components/Dialogs/About';
import { ChangePassword } from './components/Dialogs/ChangePassword';
import { ComposeMessage } from './components/Dialogs/ComposeMessage';
import { ShowMessage } from './components/Dialogs/ShowMessage';
import { UpdateUsername } from './components/Dialogs/UpdateUsername';
import { Verification } from './components/Dialogs/Verification';
import { ForgotPassword } from './components/Login/ForgotPassword';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import Header from './components/headers/Header';
import { Filter } from './components/headers/parts/Filter';
import AddQuestion from './components/main/AddQuestion/AddQuestion';
import Home from './components/main/Home/Home';
import Notifications from './components/main/Notifications/Notifications';
import QNA from './components/main/QNA/QNA';
import User from './components/main/User/User';
import UserBookmarks from './components/main/UserBookmarks/UserBookmarks';
import { UserChat } from './components/main/UserChats/UserChat';
import { UserInbox } from './components/main/UserInbox/UserInbox';
import UserQuestions from './components/main/UserQuestions/UserQuestions';
import { getCategories } from './functions/APIs/category-api';
import { getGeoLocation, getIpAddress } from './functions/APIs/geolocation-api';
import { getLanguages } from './functions/APIs/language-api';

function App() {
  const { isLogin, userData } = useSelector((state) => state.login);
  const [category, setCategory] = useState([]);
  const [language, setLanguage] = useState([]);
  const authPages = ['/login', '/register', '/forgot-password'];

  // console.log("window: ", isLogin, userData)

  useEffect(() => {
    getAllCategories();
    getAllLanguages();
    getIpAddress()
      .then((ip) => {
        getGeoLocation(ip);
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  }, []);

  const getAllCategories = async () => {
    const response = await getCategories();
    setCategory(response.data);
  };

  const getAllLanguages = async () => {
    const response = await getLanguages();
    setLanguage(response.data);
  };

  return (
    <div className="App">
      <Router>
        {/* Header */}
        {<Header />}
        {/* Body */}
        {/* Before Login */}
        <Routes>
          <Route exact path="" element={<Home />}></Route>
          {/* <Route exact path='/NeatEditor' element={<NeatEditor />}></Route> */}
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/qna" element={<QNA />}></Route>
        </Routes>
        {/* After Login */}
        {isLogin && (
          <Routes>
            <Route exact path="/user-questions" element={<UserQuestions />}></Route>
            <Route
              exact
              path="/add-question"
              element={<AddQuestion category={category} language={language} />}
            ></Route>
            <Route exact path="/user-bookmark" element={<UserBookmarks />}></Route>
            <Route exact path="/user-notification" element={<Notifications />}></Route>
            <Route exact path="/user" element={<User />}></Route>
            <Route exact path="/user-inbox" element={<UserInbox />}></Route>
            <Route exact path="/user-chats" element={<UserChat />}></Route>
          </Routes>
        )}
        {/* Footer */}
        {/* {isLogin && <Footer />} */}
        <Verification />
        <Messages />
        <UpdateUsername />
        <ChangePassword email={userData?.email} />
        <Filter category={category} language={language} />
        <About />
        <ComposeMessage />
        <ShowMessage />
      </Router>
    </div>
  );
}

export default App;
