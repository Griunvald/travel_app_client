import { useState } from "react";
import Textarea from "../../common/Textarea";
import Form from "../../common/Form";
import Comment from "./Comment";

function CommentsContainer() {

  const [comment, setComment] = useState("");
  const handleSubmit = () => { }
  const handleChange = (e) => {
    setComment(e.target.value);
  }

  const comments = [
    {
      id: 1,
      userId: 1,
      username: "Blue",
      createdAt: '2024-05-03 14:48:49.146989',
      body: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam, voluptates fugiat hic explicabo labore fuga.
Eveniet fugit explicabo temporibus in consequuntur sunt voluptates molestiae esse non dolorem consequatur, odit
nam ab possimus dolor voluptatum et, maxime modi eius voluptatibus voluptas doloremque, magni impedit?`
    },
    {
      id: 2,
      userId: 2,
      username: "Green",
      createdAt: '2024-04-30 14:48:49.146989',
      body: `Lorem ipsum dolor sit amet, consectetur adipisicing elit!! .`
    },
    {
      id: 3,
      userId: 3,
      username: "Pink",
      createdAt: '2024-04-25 14:48:49.146989',
      body: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam, voluptates fugiat hic explicabo labore fuga.
Eveniet fugit explicabo temporibus in consequuntur sunt voluptates molestiae esse non dolorem consequatur, odit
nam ab possimus dolor voluptatum et.`
    },
  ]

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

