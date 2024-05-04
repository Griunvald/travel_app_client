import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Textarea from "../../common/Textarea";
import Form from "../../common/Form";
import Comment from "./Comment";
import { getComments } from '../../../features/comment/commentThunks.js';
function CommentsContainer() {

  const [comment, setComment] = useState("");

  const handleSubmit = () => { }
  const handleChange = (e) => {
    setComment(e.target.value);
  }

  const dispatch = useDispatch();
  const { comments } = useSelector(store => store.comment.commentsList)
  const tripId = 1;

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
        </Form>
        <div className="grid grid-cols-1 divide-y mt-4">
          {comments &&
            comments.map(comment => <Comment comment={comment} />)
          }
        </div>
      </div >
    </>
  );
}

export default CommentsContainer;

