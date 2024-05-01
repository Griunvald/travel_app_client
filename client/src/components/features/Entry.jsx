import { useState } from 'react';
import format from 'date-fns/format';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEntry, editEntry, getEntryList } from '../../features/entry/entryThunks';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import { Form } from 'react-router-dom';
function Entry({ entryId, createdAt, textValue, urlValue, recordTags }) {

  const dispatch = useDispatch()
  const { userId } = useSelector(store => store.user);
  const formattedDate = format(new Date(createdAt), "MMMM do, yyyy, hh:mm a");

  const [editable, setEditable] = useState(false);
  const [editValue, setEditValue] = useState(textValue);

  const type = textValue ? 'text' : 'url';

  const handleDelete = async () => {
    await dispatch(deleteEntry({ entryId, type }));
    await dispatch(getEntryList(userId));
  }

  const handleChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleEdit = async () => {
    setEditable(true);
    setEditValue(textValue);
  }
  const handleCancel = async () => {
    setEditable(false);
  }

  const handleSubmit = async () => {
    await dispatch(editEntry({ entryId, textValue: editValue }));
    await dispatch(getEntryList(userId));
    setEditable(false);
  }

  return (
    <div className="w-full md:w-[700px] mx-auto">
      <div className="bg-secondary p-2">
        <p className="text-sm font-semibold mb-1 mt-2">{formattedDate}</p> {/* Use the formatted date here */}
        <div className='flex flex-row-reverse gap-2'>
          <div className='cursor-pointer' onClick={handleDelete}>Delete</div>
          <div className='cursor-pointer' onClick={handleEdit}>Edit</div>
        </div>
        {recordTags && (
          <ul className="flex gap-x-2 gap-y-3 flex-wrap mb-1 text-sm">
            {recordTags.map((tag) => (
              <li key={tag.id}>{tag.tagName}</li>
            ))}
          </ul>
        )}
      </div>
      {textValue && editable == false && (
        <p className="text-base font-normal my-4 ">{textValue}</p>
      )}
      {
        editable ? <Form onSubmit={handleSubmit}>
          <Textarea
            value={editValue}
            onChange={handleChange} />
          <Button name="Save" variant="primary" type="submit" />
          <Button name="Cancel" variant="secondary" type="button" onClick={handleCancel} />
        </Form>
          : null
      }
      {urlValue && (
        <img className="w-full md:w-[800px] my-4"
          src={`https://travel-app-dev.s3.il-central-1.amazonaws.com/${urlValue}`} alt="" />
      )}
    </div>
  );
}

export default Entry;

