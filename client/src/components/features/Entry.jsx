import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import format from 'date-fns/format';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEntry, editEntry, getEntryList } from '../../features/entry/entryThunks';
import Textarea from '../common/Textarea';
import Modal from '../common/Modal';
import { Form } from 'react-router-dom';
import Like from '../common/Like';
import ImageUpload from '../common/ImageUpload';

function Entry({ author, entryId, createdAt, textValue, urlValue, recordTags }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { userId } = useSelector(store => store.user);

  // Validate and format the date
  let formattedDate;
  try {
    formattedDate = format(new Date(createdAt), "MMMM do, yyyy, hh:mm a");
  } catch (error) {
    formattedDate = "Invalid date";
  }

  const [editable, setEditable] = useState(false);
  const [editValue, setEditValue] = useState(textValue);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const type = textValue ? 'text' : 'url';

  const handleFileSelect = (file) => {
    setImageFile(file);
    if (!file) {
      setImageFile(null);
    }
  };

  const handleDelete = async () => {
    await dispatch(deleteEntry({ entryId, type }));
    await dispatch(getEntryList(userId));
    setShowDeleteModal(false);
  };

  const handleChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleEdit = async () => {
    setEditable(true);
    setEditValue(textValue);
  };

  const handleCancel = async () => {
    setEditable(false);
  };

  const handleSubmit = async () => {
    await dispatch(editEntry({ entryId, textValue: editValue }));
    await dispatch(getEntryList(userId));
    setEditable(false);
  };

  const patchData = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to patch data:', error);
      throw error;
    }
  };

  const handleSubmitImage = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const awsData = await getData(`${import.meta.env.VITE_API_URL}/files/signed-url`, userId);

      await putData(awsData.presignedAwsUrl, imageFile);

      const updatedData = {
        urlValue: awsData.awsObjectKey,
      };

      const response = await patchData(`${import.meta.env.VITE_API_URL}/records/image/${entryId}`, updatedData);

      if (response.message === 'Record was successfully edited!') {
        await dispatch(getEntryList(userId));
        setEditable(false);
      } else {
        throw new Error('Failed to update image URL');
      }
    } catch (err) {
      console.error("Error updating image:", err);
    } finally {
      setIsLoading(false);
      setPreview(null);
      setImageFile(null);
    }
  };

  const getData = async (apiUrl) => {
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return {
        presignedAwsUrl: result.signedUrl.url,
        awsObjectKey: result.signedUrl.key
      };
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
  };

  const putData = async (presignedAwsUrl, file) => {
    try {
      const response = await fetch(presignedAwsUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return presignedAwsUrl;
    } catch (error) {
      console.error('There was a problem with the put operation:', error);
      throw error;
    }
  };

  return (
    <div className="w-full md:w-[700px] mx-auto">
      <div className="bg-secondary p-2">
        <p className="text-sm font-semibold mb-1 mt-2">{formattedDate}</p>
        <div className='flex flex-row-reverse gap-2'>
          {author === userId && (
            editable ?
              <>
                <div className='cursor-pointer' onClick={type === 'text' ? handleSubmit : handleSubmitImage}>Save</div>
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
              <li key={tag.id} className="rounded px-2 py-1">{tag.tagName}</li>
            ))}
          </ul>
        )}
      </div>
      {textValue && !editable && (
        <>
          <p className="text-base font-normal my-4 ">{textValue}</p>
          {location.pathname === '/current-trip' ? null : <Like type='record' itemId={entryId} />}
        </>
      )}
      {
        editable ?
          <Form onSubmit={type === 'text' ? handleSubmit : handleSubmitImage}>
            {
              type === 'text' ?
                <Textarea value={editValue} onChange={handleChange} /> :
                <ImageUpload onFileSelect={handleFileSelect} preview={preview} setPreview={setPreview} />
            }
          </Form>
          : null
      }
      {urlValue && (
        <>
          <img className="w-full md:w-[800px] my-4"
            src={`${import.meta.env.VITE_AWS_S3_URL}/${urlValue}`} alt="" />
          {location.pathname === '/current-trip' ? null : <Like type='record' itemId={entryId} />}
        </>
      )}
    </div>
  );
}

export default Entry;

