// TripPreview.jsx
import { Link } from 'react-router-dom';
import UserInfo from '../common/UserInfo';
//import { useUser } from '../../contexts/UserContext';
import { useSelector } from 'react-redux';
import { useFollow } from '../../contexts/FollowContext';

function TripPreview({ username, userId: leader, title, description, url, createdAt, avatar, link = null }) {
  const { username: currentUser, userId } = useSelector(store => store.user);
  const { followUser, unfollowUser, fetchFollowingUsers, followingUsers, setLeaderId } = useFollow();

  const handleFollow = async () => {
    followUser(leader);
    setLeaderId(leader);
    await fetchFollowingUsers();
  };

  const handleUnfollow = async () => {
    unfollowUser(leader);
    setLeaderId(leader);
    await fetchFollowingUsers();
  };

  const menuItems = [
    { label: "Unfollow", action: handleUnfollow },
  ];

  const showFollowButton = currentUser !== username && userId;

  const Content = (
    <>
      <h1 className="font-bold text-gray-900 text-3xl md:text-4xl leading-snug md:leading-normal">{title}</h1>
      <p className="text-base font-normal">{description}</p> 
      <img className="w-full md:w-[700px] mt-4" src={url} alt="trip cover image" />
    </>
  );

  return (
    <div className="w-full md:w-[700px] mx-auto pt-4 md:pt-6 mb-4">
      <UserInfo 
        leader={leader}
        avatar={avatar}
        username={username}
        createdAt={createdAt}
        onFollowClick={handleFollow}
        menuItems={menuItems}
        showFollowButton={showFollowButton}
        followingUsers={followingUsers}
      />
      {link ? (
        <Link to={link} className="cursor-pointer">
          {Content}
        </Link>
      ) : (
        Content
      )}
    </div>
  );
}

export default TripPreview;

