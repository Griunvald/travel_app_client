import React from 'react';
import format from 'date-fns/format';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEntry, getEntryList } from '../../features/entry/entryThunks';
function Entry({ entryId, createdAt, textValue, urlValue, recordTags }) {
  // Format the createdAt date
  const dispatch = useDispatch()
  const { userId } = useSelector(store => store.user);
  const formattedDate = format(new Date(createdAt), "MMMM do, yyyy, hh:mm a");

  const type = textValue ? 'text' : 'url';

  const handleDelete = async () => {
    await dispatch(deleteEntry({ entryId, type }));
    await dispatch(getEntryList(userId));
  }

  return (
    <div className="w-full md:w-[700px] mx-auto">
      <div className="bg-secondary p-2">
        <p className="text-sm font-semibold mb-1 mt-2">{formattedDate}</p> {/* Use the formatted date here */}
        <div className='flex flex-row-reverse gap-2'>
          <div className='cursor-pointer' onClick={handleDelete}>Delete</div>
          <div>Edit</div>
        </div>
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
        <img className="w-full md:w-[800px] my-4"
          src={`https://travel-app-dev.s3.il-central-1.amazonaws.com/${urlValue}`} alt="" />
      )}
    </div>
  );
}

export default Entry;

