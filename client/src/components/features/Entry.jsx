import React from 'react';
import format from 'date-fns/format';

function Entry({ id, createdAt, textValue, urlValue, recordTags }) {
  // Format the createdAt date
  const formattedDate = format(new Date(createdAt), "MMMM do, yyyy, hh:mm a");

  return (
    <div className="w-full md:w-[700px] mx-auto">
      <div className="bg-secondary p-2">
      <p className="text-sm font-semibold mb-1 mt-2">{formattedDate}</p> {/* Use the formatted date here */}
      {recordTags && (
        <ul className="flex gap-x-2 gap-y-3 flex-wrap mb-1 text-sm">
          {recordTags.map((tag) => (
            <li key={tag.id}>{tag.tagName}</li>
          ))}
        </ul>
      )}
      </div>
      {textValue && (
        <p className="text-base font-normal my-4 ">{textValue}</p>
      )}
      {urlValue && (
        <img  className="w-full md:w-[800px] my-4" 
          src={`https://travel-app-dev.s3.il-central-1.amazonaws.com/${urlValue}`} alt="" />
      )}
    </div>
  );
}

export default Entry;

