import {Link} from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

function Logo() {
  const { userId } = useUser();
    return(
        <h1 className="font-pacifico text-2xl text-black"><Link to={ userId ? "/trips-list" : "/landing"}>Road Cronicles</Link></h1>
    )
};

export default Logo;
