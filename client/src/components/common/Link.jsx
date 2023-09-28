import { Link as RouterLink } from 'react-router-dom';

function Link({ name, path }) {
  return (
        <RouterLink to={path} className={`underline decoration-solid font-bold`}>
          {name}
        </RouterLink>
  );
}

export default Link;

