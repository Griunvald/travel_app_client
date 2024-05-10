import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import format from 'date-fns/format';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEntry, editEntry, getEntryList } from '../../features/entry/entryThunks';
import Textarea from '../common/Textarea';
import Modal from '../common/Modal';
import { Form } from 'react-router-dom';
import Like from '../common/Like'

function Entry({ author, entryId, createdAt, textValue, urlValue, recordTags }) {

  const dispatch = useDispatch();
  const location = useLocation();
  const { userId } = useSelector(store => store.user);
  const formattedDate = format(new Date(createdAt), "MMMM do, yyyy, hh:mm a");

  const [editable, setEditable] = useState(false);
  const [editValue, setEditValue] = useState(textValue);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  const type = textValue ? 'text' : 'url';

  const handleDelete = async () => {
    await dispatch(deleteEntry({ entryId, type }));
    await dispatch(getEntryList(userId));
    setShowDeleteModal(false);
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
          {author === userId && (
            editable ?
              <>
                <div className='cursor-pointer' onClick={handleSubmit}>Save</div>
                <div className='cursor-pointer' onClick={handleCancel}>Cancel</div>
              </> :
              <>
                <div className='cursor-pointer' onClick={() => setShowDeleteModal(true)}>Delete</div>
                <div className='cursor-pointer' onClick={handleEdit}>Edit</div>
              </>
          )}
          <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
            <div className="space-y-4">
              <h2 className="text-lg">Are you sure you want to delete this entry?</h2>
              <div className="flex justify-end space-x-2">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDelete}>Delete</button>
                <button className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              </div>
            </div>
          </Modal>
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
        <>
          <p className="text-base font-normal my-4 ">{textValue}</p>
          {location.pathname === '/current-trip' ? null : <Like type='record' itemId={entryId} />}
        </>
      )}
      {
        editable ? <Form onSubmit={handleSubmit}>
          <Textarea
            value={editValue}
            onChange={handleChange} />
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

