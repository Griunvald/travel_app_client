import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Textarea from "../../common/Textarea";
import Form from "../../common/Form";
import Comment from "./Comment";
import { getComments, addComment, deleteComment } from '../../../features/comment/commentThunks.js';


function CommentsContainer() {

  const [comment, setComment] = useState("");


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

  const handleEdit = () => {
    //
  }

  const handleDelete = async (commentId, commentOwner) => {
    await dispatch(deleteComment({ commentId, commentOwner }))
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
              onEdit={handleEdit}
              onDelete={() => handleDelete(comment.id, comment.user_id)}
            />)
          }
        </div>
      </div >
    </>
  );
}

export default CommentsContainer;

