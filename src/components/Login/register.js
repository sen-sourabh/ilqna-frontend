import React from 'react';
//Routers
import {
  Link
} from "react-router-dom";
//SCSS
import '../../sass/main.scss';

export default function register() {
  return (
    <div className='ilqna-main'>register
        <Link to="/login">Login</Link>
    </div>
  )
}
