import React, { Fragment } from 'react';
// import BGImage from '../../images/login_bg_image.jpg';
// import BGImage from '../../images/login_screen1.jpg';
// import BGImage from '../../images/4k_bg1.jpg';
import BGImage from '../../images/4k_bg2.jpg';

export default function LoginBg() {
  return (
    <Fragment>
      <img 
        src={BGImage} 
        alt="login-bg"
        style={{
            width: '100%', 
            height: '100%', 
            position: 'absolute'
        }} 
      />
    </Fragment>
  )
}
