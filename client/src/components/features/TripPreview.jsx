import { Link } from 'react-router-dom';
import Avatar from '../common/Avatar.jsx';
import Button from '../common/Button';

function TripPreview({ id, username, title, description, url, createdAt, avatar, link = null }) {
    const UserInfo = (
        <div className="flex justify-between mt-2 mb-6 py-2 pb-2 items-center w-full"> {/* Adjusted for full width and justify content */}
            <div className="flex gap-2 items-end"> {/* Wrap the avatar and text in a div to align them separately from the button */}
                <Avatar avatar={avatar} />
                <div>
                    <p className="font-semibold text-sm">{username}</p>
                    <p className="text-sm">{createdAt}</p>
                </div>
            </div>
            <div>
                <Button name="Follow" />
            </div>
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

