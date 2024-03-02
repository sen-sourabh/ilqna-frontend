import React, { Fragment } from 'react';
//Routes
// import {
//   Link
// } from "react-router-dom";
//UI

//SCSS
import '../../../sass/user.scss';

import { UserProfileHeader } from './components/UserProfileHeader';
import UserTabs from './components/UserTabs';

export default function User() {
  return (
    <Fragment>
      <UserProfileHeader />
      <UserTabs />
    </Fragment>
  );
}
