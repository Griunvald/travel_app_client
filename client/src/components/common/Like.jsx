import React, { useState } from 'react';
import LikeIcon from '../../assets/Like.svg'
import UnlikeIcon from '../../assets/Unlike.svg'

function Like() {
  const [like, setLike] = useState(false);
  return (
    <div onClick={() => setLike(!like)}>
      {like ? <img className='cursor-pointer' src={LikeIcon} /> : <img className='cursor-pointer' src={UnlikeIcon} />}
    </div>
  )
}

export default Like;


