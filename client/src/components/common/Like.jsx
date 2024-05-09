import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addLike, removeLike } from '../../features/like/likeThunks';
import LikeIcon from '../../assets/Like.svg'
import UnlikeIcon from '../../assets/Unlike.svg'

function Like({ type, itemId }) {
  console.log(type, itemId);
  const [like, setLike] = useState(false);
  const dispatch = useDispatch();

  const handleAddLike = async () => {
    await dispatch(addLike({ type, itemId }))
    setLike(true);
  }

  const handleRemoveLike = async () => {
    await dispatch(removeLike({ type, itemId }))
    setLike(false);
  }

  return (
    <div onClick={like ? handleRemoveLike : handleAddLike}>
      {like ? <img className='cursor-pointer' src={LikeIcon} /> : <img className='cursor-pointer' src={UnlikeIcon} />}
    </div>
  )
}

export default Like;


