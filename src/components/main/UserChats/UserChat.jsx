import React from 'react'
//SCSS
import '../../../sass/home.scss';
import '../../../sass/user-chat.scss';
import { ChatSidebar } from './parts/ChatSidebar';

export const UserChat = () => {
  return (
    <div className='ilqna-main user-chats-page'>
        <div>
          <ChatSidebar />
        </div>
    </div>
  )
}
