import React from 'react'
//Routers
import {
  Link
} from "react-router-dom";
//SCSS
import '../../sass/main.scss';

export default function login() {
  return (
    <div className='ilqna-main'>login
      <Link to="/register">Register</Link>
      <Link to="/forgot-password">Forgot Password</Link>
    </div>
  )
}
