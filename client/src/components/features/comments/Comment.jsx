import { useSelector } from "react-redux";
import Avatar from "../../common/Avatar";
import { timeAgo } from "../../../utils/date";

const Comment = ({ comment, onEdit, onDelete }) => {

  const { userId } = useSelector(store => store.user)
  const canEdit = comment.user_id == userId;
  return (
    <div className="bg-white border-black border-solid  p-4 mb-4">
      <div className="flex items-start space-x-4">
        <Avatar />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h5 className="font-bold text-sm">{comment.username}</h5>
            <span className="text-xs text-gray-800">{timeAgo(comment.created_at)}</span>
          </div>
          <p className="text-base font-normal mt-2">{comment.body}</p>
          <div className="flex space-x-2 mt-2">
            <button className="text-blue-500 text-sm hover:text-blue-700">Reply</button>
            <button className="text-blue-500 text-sm hover:text-blue-700">Like</button>
            {canEdit && (
              <>
                <button className="text-blue-500 text-xs hover:text-blue-700" onClick={onEdit}>Edit</button>
                <button className="text-blue-500 text-xs hover:text-blue-700" onClick={onDelete}>Delete</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Comment;
