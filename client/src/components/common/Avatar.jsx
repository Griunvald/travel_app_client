import avatarIcon from '../../assets/avatar.svg';
import { useSelector } from 'react-redux';

function Avatar({ avatar, size }) {
  const avatarUrl = useSelector(store => store.profile.avatar);
  const sizeClass = size === 'big' ? 'h-12 w-12' : 'h-10 w-10'
  const url = `https://travel-app-dev.s3.il-central-1.amazonaws.com/${avatarUrl}`;
  console.log(url);
  return (
    <div>
      <img className={`${sizeClass} object-cover rounded-full`} src={avatarUrl ? url : avatarIcon} alt="user avatar" />
    </div>
  );
};

export default Avatar;
