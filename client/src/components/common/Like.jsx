import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLike, removeLike, getItemLikesCountListByType } from '../../features/like/likeThunks';
import LikeIcon from '../../assets/Like.svg';
import UnlikeIcon from '../../assets/Unlike.svg';

function Like({ type, itemId }) {
  const [like, setLike] = useState(false);
  const dispatch = useDispatch();
  const { likesCountList } = useSelector(store => store.like);

  useEffect(() => {
    dispatch(getItemLikesCountListByType({ type }));
  }, [dispatch, type]);

  const itemLikeCount = likesCountList.find(item => item.type_id === itemId);

  const handleAddLike = async () => {
    await dispatch(addLike({ type, itemId }));
    await dispatch(getItemLikesCountListByType({ type }));
    setLike(true);
  };

  const handleRemoveLike = async () => {
    await dispatch(removeLike({ type, itemId }));
    await dispatch(getItemLikesCountListByType({ type }));
    setLike(false);
  };

  return (
    <div onClick={like ? handleRemoveLike : handleAddLike}>
      {like ? <img className='cursor-pointer' src={LikeIcon} alt="Unlike" /> : <img className='cursor-pointer' src={UnlikeIcon} alt="Like" />}
      <p>{itemLikeCount ? itemLikeCount.item_likes_count : 0}</p>
    </div>
  );
}

export default Like;

