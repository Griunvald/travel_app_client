import avatarIcon from '../../assets/avatar.svg';
function Avatar({ avatar }) {
    return (
        <div>
           <img className="h-9 w-9 md:h-12 md:w-12" src={avatar ? avatar : avatarIcon} alt="user avatar" /> 
        </div>
    );
};

export default Avatar;
