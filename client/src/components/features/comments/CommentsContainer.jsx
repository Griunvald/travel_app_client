import { useState } from "react";
import Textarea from "../../common/Textarea";
import Form from "../../common/Form";

function CommentsContainer() {

  const [comment, setComment] = useState("");
  const handleSubmit = () => { }
  const handleChange = (e) => {
    setComment(e.target.value);
  }

  return (
    <>
      <div className="w-full md:w-[700px] mx-auto">
        <h2 className="font-medium text-2xl text-center mb-6">Add a comment</h2>
        <Form onSubmit={handleSubmit}>
          <Textarea
            rows="1"
            maxLength={500}
            showCharacterCount={true}
            value={comment}
            onChange={handleChange}
          />
        </Form>
      </div >
    </>
  );
}

export default CommentsContainer;

