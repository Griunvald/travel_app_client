// UserInfo.jsx
import React from 'react';
import Avatar from './Avatar';
import FollowButton from './FollowButton';
import ThreeDotsMenu from './ThreeDotsMenu';

const UserInfo = ({ avatar, username, createdAt, handleFollow, menuItems, showFollowButton }) => (
  <div className="flex justify-between mt-2 mb-6 py-2 pb-2 items-center w-full">
    <div className="flex gap-2 items-end">
      <Avatar avatar={avatar} />
      <div>
        <p className="font-semibold text-sm">{username}</p>
        <p className="text-sm">{createdAt}</p>
      </div>
    </div>
    {showFollowButton && (
      <div>
        <FollowButton onClick={handleFollow} />
        <ThreeDotsMenu menuItems={menuItems} />
      </div>
    )}
  </div>
);

export default UserInfo;

