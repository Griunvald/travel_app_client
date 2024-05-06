import { useSelector } from "react-redux";
import { useState } from "react";
import Avatar from "../../common/Avatar";
import { timeAgo } from "../../../utils/date";
import Textarea from "../../common/Textarea";

const Comment = ({ comment, isEditing, onEdit, onEditSave, onCancelEdit, onDelete }) => {
  const { userId } = useSelector(store => store.user);
  const canEdit = comment.user_id === userId;
  const [editText, setEditText] = useState(comment.body);  // Local state to hold the edited text

  return (
    <div className="bg-white border-black border-solid p-4 mb-4">
      <div className="flex items-start space-x-4">
        <Avatar />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h5 className="font-bold text-sm">{comment.username}</h5>
            <span className="text-xs text-gray-800">{timeAgo(comment.created_at)}</span>
          </div>
          {isEditing ? (
            <>
              <Textarea value={editText} onChange={(e) => setEditText(e.target.value)} />
              <button onClick={() => onEditSave(editText)}>Save</button>
              <button onClick={onCancelEdit}>Cancel</button>
            </>
          ) : (
            <>
              <p className="text-base font-normal mt-2">{comment.body}</p>
              {canEdit && (
                <>
                  <button onClick={onEdit}>Edit</button>
                  <button onClick={onDelete}>Delete</button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
