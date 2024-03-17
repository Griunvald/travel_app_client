function FollowButton({ leaderId, onFollowClick, isFollowing }) {

  return (
    <button className={`md:max-w-max px-8 py-2 text-base font-medium rounded
      bg-inherit text-gray-900 border border-primary`}
      onClick={ () => onFollowClick(leaderId)}
      disabled={isFollowing}
    >
      {isFollowing ? 'Following':'Follow'}
    </button>
  );
}

export default FollowButton;


