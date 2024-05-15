import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLike, removeLike, getItemLikesCountListByType } from '../../features/like/likeThunks';
import LikeIcon from '../../assets/Like.svg';
import UnlikeIcon from '../../assets/Unlike.svg';

function Like({ type, itemId }) {
  const dispatch = useDispatch();
  const { recordLikesCountList } = useSelector(store => store.like);
  const { commentLikesCountList } = useSelector(store => store.like);

  useEffect(() => {
    dispatch(getItemLikesCountListByType({ type }));
  }, [dispatch, type]);

  const list = type === 'record' ? recordLikesCountList : commentLikesCountList
  const itemLikeDetails = list.find(item => item.typeId === itemId) || { itemLikesCount: 0, likedByCurrentUser: false };

  const toggleLike = async () => {
    if (itemLikeDetails.likedByCurrentUser) {
      await dispatch(removeLike({ type, itemId }));
    } else {
      await dispatch(addLike({ type, itemId }));
    }
    await dispatch(getItemLikesCountListByType({ type }));
  };

  return (
    <div className='flex gap-1' onClick={toggleLike}>
      <img
        className='cursor-pointer'
        src={itemLikeDetails.likedByCurrentUser ? LikeIcon : UnlikeIcon}
        alt={itemLikeDetails.likedByCurrentUser ? "Unlike" : "Like"}
      />
      <p>{itemLikeDetails.itemLikesCount}</p>
    </div>
  );
}

export default Like;

