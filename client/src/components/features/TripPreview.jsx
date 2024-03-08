import { Link } from 'react-router-dom';
import Avatar from '../common/Avatar.jsx';
import Button from '../common/Button';
import { useUser} from '../../contexts/UserContext';
import { useFollow } from '../../contexts/FollowContext';

function TripPreview({ id, username, userId: leader, title, description, url, createdAt, avatar, link = null }) {

  const {username: currentUser, userId: follower} = useUser();
  const { followUser } = useFollow();

   const handleClick = () => {
    followUser(leader, follower);
      console.log("leader is: ", leader);
      console.log("follower is: ", follower);
  };

    const UserInfo = (
        <div className="flex justify-between mt-2 mb-6 py-2 pb-2 items-center w-full"> 
            <div className="flex gap-2 items-end"> 
                <Avatar avatar={avatar} />
                <div>
                    <p className="font-semibold text-sm">{username}</p>
                    <p className="text-sm">{createdAt}</p>
                </div>
            </div>
      {currentUser === username  ? (null):(
            <div id={username}>
                <Button name="Follow" onClick={handleClick} />
            </div>
      )}
        </div>
    );

    const Content = (
        <>
            <h1 className="font-bold text-gray-900 text-3xl md:text-4xl leading-snug md:leading-normal">{title}</h1>
            <p className="text-base font-normal">{description}</p>
            <img className="w-full md:w-[700px] mt-4" src={url} alt="trip cover image" />
        </>
    );

    return (
        <div className="w-full md:w-[700px] mx-auto pt-4 md:pt-6 mb-4">
            {UserInfo}
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

