// import * as React from 'react';
//UI
// import Paper from '@mui/material/Paper';
// import BottomNavigation from '@mui/material/BottomNavigation';
// import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// import Tooltip from '@mui/material/Tooltip';
// import HomeIcon from '@mui/icons-material/Home';
// import PersonIcon from '@mui/icons-material/Person';
// import AddBoxIcon from '@mui/icons-material/AddBox';
// import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
// //Routers
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link
// } from "react-router-dom";
// //SCSS
// import '../../sass/footer.scss';
// //Component
// import Home from '../main/Home/home';
// import UserQuestions from '../main/UserQuestions/userQuestions';
// import AddQuestion from '../main/AddQuestion/addQuestion';
// import UserBookmarks from '../main/UserBookmarks/userBookmarks';
// import User from '../main/User/user';

// export default function footer() {
  // const [value, setValue] = React.useState('recents');

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  // return (
      // <Router>
      //   <Routes>
      //     <Route exact path="/home" element={<Home />}></Route>
      //     <Route exact path="/user-questions" element={<UserQuestions />}></Route>
      //     <Route exact path="/add-question" element={<AddQuestion />}></Route>
      //     <Route exact path="/user-bookmark" element={<UserBookmarks />}></Route>
      //     <Route exact path="/user" element={<User />}></Route>
      //   </Routes>
      //   <div className='footer'>
      //     <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      //         <BottomNavigation 
      //           sx={{ width: '100%' }} 
      //           // value={value} 
      //           // onChange={handleChange}  
      //         >
      //           <Tooltip title="Home" placement="top" arrow>
      //             <Link to="/home">
      //               <BottomNavigationAction
      //                 label="Home"
      //                 className="footer-icon"
      //                 // value="recents"
      //                 icon={<HomeIcon />}
      //               />
      //             </Link>
      //           </Tooltip>
      //           <Tooltip title="Asked By You" placement="top" arrow>
      //             <Link to="/user-questions">
      //               <BottomNavigationAction 
      //                 label="QuestionAnswer" 
      //                 className="footer-icon"
      //                 // value="folder" 
      //                 icon={<QuestionAnswerIcon />} 
      //               />
      //             </Link>
      //           </Tooltip>
      //           <Tooltip title="You Can Ask" placement="top" arrow>
      //             <Link to="/add-question">
      //               <BottomNavigationAction
      //                 label="AddBox"
      //                 className="footer-icon"
      //                 // value="nearby"
      //                 icon={<AddBoxIcon />}
      //               />
      //             </Link>
      //           </Tooltip>
      //           <Tooltip title="Your Bookmarks" placement="top" arrow>
      //             <Link to="/user-bookmark">
      //               <BottomNavigationAction 
      //                 label="Bookmark" 
      //                 className="footer-icon"
      //                 // value="folder" 
      //                 icon={<BookmarkIcon />} 
      //               />
      //             </Link>
      //           </Tooltip>
      //           <Tooltip title="You" placement="top" arrow>
      //             <Link to="/user">
      //               <BottomNavigationAction
      //                 label="Person"
      //                 className="footer-icon"
      //                 // value="favorites"
      //                 icon={<PersonIcon />}
      //               />
      //             </Link>
      //           </Tooltip>
      //         </BottomNavigation>
      //     </Paper>
      //   </div>
      // </Router>
//   )
// }
