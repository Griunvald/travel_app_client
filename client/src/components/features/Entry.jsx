import React from 'react';
import format from 'date-fns/format';

function Entry({ id, createdAt, textValue, urlValue, recordTags }) {
  // Format the createdAt date
  const formattedDate = format(new Date(createdAt), "MMMM do, yyyy, hh:mm a");

  return (
    <div className="w-full md:w-[800px] mx-auto ">
      <p className="text-sm">{formattedDate}</p> {/* Use the formatted date here */}
      {recordTags && (
        <ul className="flex flex-wrap">
          {recordTags.map((tag) => (
            <li key={tag.id}>{tag.tagName}</li>
          ))}
        </ul>
      )}
      {textValue && (
        <p className="text-base font-normal">{textValue}</p>
      )}
      {urlValue && (
        <img  className="w-full md:w-[800px] md:h-[600px] object-cover mt-4" 
          src={`https://travel-app-dev.s3.il-central-1.amazonaws.com/${urlValue}`} alt="" />
      )}
    </div>
  );
}

export default Entry;

