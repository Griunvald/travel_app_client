import { useState, useEffect, useRef } from 'react';
import Avatar from './Avatar';
import FollowButton from './FollowButton';
import ThreeDotsMenu from './ThreeDotsMenu';
import AboutPreview from '../features/AboutPreview';

const UserInfo = ({ leader, avatar, about, username, createdAt, menuItems, showFollowButton, onFollowClick, followingUsers }) => {
  const [isClicked, setIsClicked] = useState(false);
  const isFollowing = followingUsers.includes(leader);
  const containerRef = useRef(null);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsClicked(false);
    }
  };

  useEffect(() => {
    if (isClicked) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isClicked]);

  return (
    <div className="relative flex justify-between mt-2 mb-6 py-2 pb-2 items-center w-full">
      <div className="flex gap-2 items-end">
        <Avatar avatar={avatar} />
        <div
          onClick={handleClick}
          className="relative cursor-pointer"
          ref={containerRef}
        >
          {isClicked && about && (
            <AboutPreview about={about} leader={leader} />
          )}
          <p className="font-semibold text-sm">{username}</p>
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

