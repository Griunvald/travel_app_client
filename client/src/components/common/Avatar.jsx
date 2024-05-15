import avatarIcon from '../../assets/avatar.svg';

function Avatar({ avatar, size }) {
  const sizeClass = size === 'big' ? 'h-12 w-12' : 'h-10 w-10'
  const url = `https://travel-app-dev.s3.il-central-1.amazonaws.com/${avatar}`;
  return (
    <div>
      <img className={`${sizeClass} object-cover rounded-full`} src={avatar ? url : avatarIcon} alt="user avatar" />
    </div>
  );
};

export default Avatar;
