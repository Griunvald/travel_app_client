// UserInfo.jsx
import React from 'react';
import Avatar from './Avatar';
import FollowButton from './FollowButton';
import ThreeDotsMenu from './ThreeDotsMenu';

const UserInfo = ({ leader, avatar, username, createdAt, menuItems, showFollowButton, onFollowClick, followingUsers }) => {
  const isFollowing = followingUsers.includes(leader);
  return (
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
          <FollowButton leaderId={leader} onFollowClick={onFollowClick} isFollowing={isFollowing} />
          { isFollowing ? <ThreeDotsMenu menuItems={menuItems} /> : null }
        </div>
      )}
    </div>
  );
};

export default UserInfo;

