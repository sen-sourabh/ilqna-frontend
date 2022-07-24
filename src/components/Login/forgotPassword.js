import React from 'react';
//Routers
import {
  Link
} from "react-router-dom";
//SCSS
import '../../sass/main.scss';

export default function forgotPassword() {
  return (
    <div className='ilqna-main'>forgotPassword
        <Link to="/login">Back</Link>
    </div>
  )
}
