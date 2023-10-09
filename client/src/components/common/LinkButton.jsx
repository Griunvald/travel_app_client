import { Link } from 'react-router-dom';

function LinkButton({ name, variant, path, onClick }) {
  return (
        <Link to={path} className={`md:max-w-max h-10 px-8 py-2 text-base font-medium rounded text-center 
            ${variant === 'primary' ? 'bg-accent text-white' :
                    'bg-inherit text-gray-900 border border-primary'}`} onClick={onClick}>
          {name}
        </Link>
  );
}

export default LinkButton;

