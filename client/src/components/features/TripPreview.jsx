import { Link } from 'react-router-dom';
import Avatar from '../common/Avatar.jsx';

function TripPreview({id, username,  title, description, url, createdAt, avatar, link = null}) {

    const Content = (
        <>
            <h1 className="font-bold text-gray-900 text-3xl md:text-4xl leading-snug md:leading-normal">{title}</h1>
            <div className="flex my-2 py-2 gap-2 items-end">
            <Avatar avatar={avatar} />
            <div>
                  <p className="font-semibold text-sm">{username}</p>
                  <p className="text-sm">{createdAt}</p>
            </div>
            </div>
            <p className="text-base font-normal">{description}</p>
            <img className="w-full md:w-[800px] md:h-[600x] object-cover mt-4" src={url} alt="trip cover image" />
        </>
    );

    return(
        <div className={link ? "w-full md:w-[800px] mx-auto pt-4 md:pt-6 mb-4 cursor-pointer" : "w-full md:w-[800px] mx-auto pt-4 md:pt-6 mb-4"}>
            {link ? (
                <Link to={link}>
                    {Content}
                </Link>
            ) : (
                Content
            )}
        </div>
    )
}

export default TripPreview;

