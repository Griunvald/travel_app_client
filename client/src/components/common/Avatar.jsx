import avatarIcon from '../../assets/avatar.svg';
function Avatar({ avatar }) {
    return (
        <div>
           <img src={avatar ? avatar : avatarIcon} alt="user avatar" /> 
        </div>
    );
};

export default Avatar;
