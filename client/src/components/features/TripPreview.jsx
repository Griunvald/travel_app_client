import Avatar from '../common/Avatar.jsx';

function TripPreview({id, username,  title, description, url, createdAt, avatar}) {
    return(
        <div className="w-full md:w-[800px] mx-auto pt-4 md:pt-6 mb-4 border border-2 shadow-soft p-2" key={id}>
            <h1 className="font-bold text-gray-900 text-3xl md:text-4xl">{title}</h1>
            <div className="flex my-2 py-2 gap-2 items-end">
            <Avatar avatar={avatar} />
            <div>
                  <p className="font-semibold text-sm">{username}</p>
                  <p className="text-sm">{createdAt}</p>
            </div>
            </div>
            <p className="text-base font-normal">{description}</p>
            <img className="w-full md:w-[800px] md:h-[600x] object-cover mt-4" src={url} alt="trip cover image" />
        </div>
    )
}

export default TripPreview;
