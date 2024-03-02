import React from 'react';
//SCSS
import '../../../sass/home.scss';
import '../../../sass/user-inbox.scss';
import { InboxSidebar } from './parts/InboxSidebar';

export const UserInbox = () => {
  return (
    <div className="ilqna-main">
      <div>
        <InboxSidebar />
      </div>
    </div>
  );
};
