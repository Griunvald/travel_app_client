import { useFollow } from '../../contexts/FollowContext';

function FollowButton({ onClick }) {
  const { followedUsers } = useFollow();

  // TODO: Get id of followed user 
   const isFollowing = followedUsers.includes(2);

  return (
    <button className={`md:max-w-max px-8 py-2 text-base font-medium rounded
      bg-inherit text-gray-900 border border-primary`}
      onClick={onClick}
    >
      {isFollowing ? 'Following':'Follow'}
    </button>
  );
}

export default FollowButton;


