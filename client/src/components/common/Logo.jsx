import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

function Logo() {
  const { userId } = useSelector(store => store.user);
    return(
        <h1 className="font-pacifico text-2xl text-black"><Link to={ userId ? "/trips-list" : "/landing"}>Road Cronicles</Link></h1>
    )
};

export default Logo;
