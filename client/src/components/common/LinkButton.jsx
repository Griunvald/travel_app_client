import { Link } from 'react-router-dom';

function LinkButton({ name, type, path, onClick }) {
  return (
        <Link to={path} className={`px-8 py-2 text-lg font-semibold rounded text-center 
            ${type === 'primary' ? 'bg-black text-white' :
                    'bg-inherit text-black'}`} onClick={onClick}>
          {name}
        </Link>
  );
}

export default LinkButton;

