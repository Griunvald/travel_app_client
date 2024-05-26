import React, { useState } from 'react';
import Avatar from './Avatar';
import FollowButton from './FollowButton';
import ThreeDotsMenu from './ThreeDotsMenu';
import AboutPreview from '../features/AboutPreview';

const UserInfo = ({ leader, avatar, username, createdAt, menuItems, showFollowButton, onFollowClick, followingUsers }) => {
  const [hover, setHover] = useState(false);
  const isFollowing = followingUsers.includes(leader);
  return (
    <div className="relative flex justify-between mt-2 mb-6 py-2 pb-2 items-center w-full">
      <div className="flex gap-2 items-end">
        <Avatar avatar={avatar} />
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="relative"
        >
          <p className="font-semibold text-sm">{username}</p>
          {hover && <AboutPreview />}
          <p className="text-sm">{createdAt}</p>
        </div>
      </div>
      {showFollowButton && (
        <div>
          <FollowButton leaderId={leader} onFollowClick={onFollowClick} isFollowing={isFollowing} />
          {isFollowing && <ThreeDotsMenu menuItems={menuItems} />}
        </div>
      )}
    </div>
  );
};

export default UserInfo;

