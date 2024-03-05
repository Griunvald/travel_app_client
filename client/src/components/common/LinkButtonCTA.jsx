import { Link } from 'react-router-dom';

function LinkButtonCTA({ name, variant, path, onClick }) {
  return (
    <Link to={path} className={`flex items-center justify-center md:max-w-max h-10 px-8 py-8 text-base font-medium rounded 
        ${variant === 'primary' ? 'bg-accent text-white' : 'bg-inherit text-gray-900 border border-primary'}`} onClick={onClick}>
      {name}
    </Link>
  );
}

export default LinkButtonCTA;

