import { useFollow } from '../../contexts/FollowContext';

function FollowStats() {
  const { followStats } = useFollow();
  const { followingCount, followersCount} = followStats;
  return (
    <>
      <div className="flex gap-4 w-full md:w-[700px] mx-auto pt-4 md:pt-6 mb-4">
        <div>Followers: {followersCount}</div>
        <div>Following: {followingCount}</div>
      </div>
    </>
  );
}

export default FollowStats;
