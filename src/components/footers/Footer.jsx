import React, { Fragment } from 'react';
//Routers
import { Link } from 'react-router-dom';
//UI
import AddBoxIcon from '@mui/icons-material/AddBox';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
//SCSS
import '../../App.scss';
import '../../sass/footer.scss';
import '../../sass/main.scss';
//Component

export const Footer = (props) => {
  return (
    <Fragment>
      <Paper className="footer-paper" elevation={12}>
        <BottomNavigation className="h-scroller">
          <Link className="nav-link" to="/">
            <BottomNavigationAction label="Home" className="footer-icon" icon={<HomeIcon />} />
          </Link>
          <Link className="nav-link" to="/user-questions">
            <BottomNavigationAction
              label="QuestionAnswer"
              className="footer-icon"
              icon={<QuestionAnswerIcon />}
            />
          </Link>
          <Link className="nav-link" to="/add-question">
            <BottomNavigationAction label="AddBox" className="footer-icon" icon={<AddBoxIcon />} />
          </Link>
          <Link className="nav-link" to="/user">
            <BottomNavigationAction label="Person" className="footer-icon" icon={<PersonIcon />} />
          </Link>
        </BottomNavigation>
      </Paper>
    </Fragment>
  );
};
