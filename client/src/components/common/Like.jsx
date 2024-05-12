import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLike, removeLike, getItemLikesCountListByType } from '../../features/like/likeThunks';
import LikeIcon from '../../assets/Like.svg';
import UnlikeIcon from '../../assets/Unlike.svg';

function Like({ type, itemId }) {
  const dispatch = useDispatch();
  const { likesCountList } = useSelector(store => store.like);

  useEffect(() => {
    dispatch(getItemLikesCountListByType({ type }));
  }, [dispatch, type]);

  const itemLikeDetails = likesCountList.find(item => item.type_id === itemId) || { item_likes_count: 0, liked_by_current_user: false };

  const toggleLike = async () => {
    if (itemLikeDetails.liked_by_current_user) {
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
        src={itemLikeDetails.liked_by_current_user ? LikeIcon : UnlikeIcon}
        alt={itemLikeDetails.liked_by_current_user ? "Unlike" : "Like"}
      />
      <p>{itemLikeDetails.item_likes_count}</p>
    </div>
  );
}

export default Like;

