import { useSelector } from "react-redux";
import { useState } from "react";
import Avatar from "../../common/Avatar";
import { timeAgo } from "../../../utils/date";
import Textarea from "../../common/Textarea";
import Like from "../../common/Like";

const Comment = ({ comment, isEditing, onEdit, onEditSave, onCancelEdit, onDelete }) => {
  const { userId } = useSelector(store => store.user);
  const canEdit = comment.user_id === userId;
  const [editText, setEditText] = useState(comment.body);  // Local state to hold the edited text

  return (
    <div className="bg-white border-black border-solid p-4 mb-4">
      <div className="flex items-start space-x-4">
        <Avatar avatar={comment.avatar} />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h5 className="font-bold text-sm">{comment.username}</h5>
            <span className="text-xs text-gray-800">{timeAgo(comment.created_at)}</span>
          </div>
          {isEditing ? (
            <>
              <Textarea value={editText} onChange={(e) => setEditText(e.target.value)} />
              <div className="flex space-x-2 mt-2">
                <button onClick={() => onEditSave(editText)}>Save</button>
                <button onClick={onCancelEdit}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <p className="text-base font-normal mt-2">{comment.body}</p>
              <Like type={'comment'} itemId={comment.id} />
              {canEdit && (
                <div className="flex space-x-2 mt-2">
                  <button onClick={onEdit}>Edit</button>
                  <button onClick={onDelete}>Delete</button>
                </div>

              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
