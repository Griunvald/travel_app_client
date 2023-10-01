import { MenuProvider } from './MenuContext.jsx';
import { UserProvider } from './UserContext.jsx';

export const ProvidersWrapper = ({ children }) => {
    return (
        <UserProvider>
          <MenuProvider>
            { children }
          </MenuProvider>
        </UserProvider>
    );
};
