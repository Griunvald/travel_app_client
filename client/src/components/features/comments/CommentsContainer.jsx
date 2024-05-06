import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Textarea from "../../common/Textarea";
import Form from "../../common/Form";
import Comment from "./Comment";
import Modal from "../../common/Modal.jsx";
import { getComments, addComment, deleteComment, editComment } from '../../../features/comment/commentThunks.js';

function CommentsContainer() {

  const [comment, setComment] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeComment, setActiveComment] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const dispatch = useDispatch();
  const { comments } = useSelector(store => store.comment.commentsList)
  const { tripId } = useParams();

  const handleSubmit = async () => {
    await dispatch(addComment({ tripId, comment }));
    await dispatch(getComments(tripId))
    setComment('');
  }

  const handleChange = (e) => {
    setComment(e.target.value);
  }

  const handleEditSave = async (commentId, newText, commentOwner) => {
    await dispatch(editComment({ commentId, comment: newText, commentOwner }));
    setEditingCommentId(null);
    await dispatch(getComments(tripId));
  };

  const handleDelete = async (commentId, commentOwner) => {
    await dispatch(deleteComment({ commentId, commentOwner }))
    setShowDeleteModal(false);
    setActiveComment(null);
    await dispatch(getComments(tripId))
  }

  useEffect(() => {
    async function fetchData() {
      await dispatch(getComments(tripId))
    }
    fetchData();
  }, [tripId]);


  return (
    <>
      <div className="w-full md:w-[700px] mx-auto mt-12">

        <Form onSubmit={handleSubmit}>
          <Textarea
            rows="2"
            maxLength={500}
            showCharacterCount={true}
            value={comment}
            placeholder="Add a comment"
            onChange={handleChange}
          />
          <div className="flex justify-end">
            <button type="submit">Send</button>
          </div>
        </Form>

        <div className="grid grid-cols-1 divide-y mt-4">
          {comments &&
            comments.map(comment => <Comment
              comment={comment}
              key={comment.id}
              isEditing={editingCommentId === comment.id}
              onEditSave={(newText) => handleEditSave(comment.id, newText, comment.user_id)}
              onEdit={() => setEditingCommentId(comment.id)}
              onCancelEdit={() => setEditingCommentId(null)}
              onDelete={() => {
                setActiveComment({ commentId: comment.id, commentOwner: comment.user_id });
                setShowDeleteModal(true)
              }}
            />)
          }
        </div>

        <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
          <div className="space-y-4">
            <h2 className="text-lg">Are you sure you want to delete this comment?</h2>
            <div className="flex justify-end space-x-2">
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDelete(activeComment.commentId, activeComment.commentOwner)}>Delete</button>
              <button className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
                onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </Modal>
      </div >
    </>
  );
}

export default CommentsContainer;

