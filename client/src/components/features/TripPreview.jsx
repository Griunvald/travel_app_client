import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ReadMoreLink from '../common/Link'
import UserInfo from '../common/UserInfo';
import { useSelector, useDispatch } from 'react-redux';
import { followUser, unfollowUser, getFollowingUsers } from '../../features/follow/followThunks';
import { setLeaderId } from '../../features/follow/followSlice';

function TripPreview({ username, userId: leader, title, description, url, createdAt, avatar, about, link = null }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { username: currentUser, userId } = useSelector(store => store.user);

  const followingUsers = useSelector((store) => store.follow.followingUsersIds);

  const handleFollow = async () => {
    dispatch(setLeaderId(leader));
    await dispatch(followUser(leader)).unwrap();
    await dispatch(getFollowingUsers()).unwrap();
  };

  const handleUnfollow = async () => {
    dispatch(setLeaderId(leader));
    await dispatch(unfollowUser(leader)).unwrap();
    await dispatch(getFollowingUsers()).unwrap();
  };

  const showFollowButton = currentUser !== username && userId;
  const isFollowing = followingUsers.includes(leader);
  const menuItems = isFollowing ? [{ label: "Unfollow", action: handleUnfollow }] : [];

  const Content = (
    <>
      <h1 className="font-bold text-gray-900 text-3xl md:text-4xl leading-snug md:leading-normal">{title}</h1>
      <img className="w-full md:w-[700px] my-6" src={url} alt="trip cover image" />
      <p className="text-base font-normal">{description}</p>
          {location.pathname === '/trips-list' && <ReadMoreLink path={link} name="Read more"/>}
    </>
  );
  useEffect(() => {
    if(userId){
      dispatch(getFollowingUsers());
    }
  }, [dispatch]);


  return (
    <div className="w-full md:w-[700px] mx-auto pt-4 md:pt-6 mb-4">
      <UserInfo
        leader={leader}
        avatar={avatar}
        about={about}
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

