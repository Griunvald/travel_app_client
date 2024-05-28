import {Link} from 'react-router-dom';

function Logo() {
    return(
        <h1 className="font-pacifico text-2xl text-black"><Link to={"/trips-list"}>Road Cronicles</Link></h1>
    )
};

export default Logo;
