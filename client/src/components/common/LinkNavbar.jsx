import { Link } from 'react-router-dom';

function LinkNavbar({ name, path, onClick }) {
  return (
    <Link to={path} className="md:max-w-max h-10 px-8 py-2 text-base font-medium 
      rounded text-center bg-inherit text-gray-900" onClick={onClick}>
      <span className="border-b-2 border-transparent hover:border-current pb-1">
        {name}
      </span>
    </Link>
  );
}

export default LinkNavbar;
