import { MenuProvider } from './MenuContext.jsx';
import { UserProvider } from './UserContext.jsx';
import { ImageProvider } from './ImageContext.jsx';

export const ProvidersWrapper = ({ children }) => {
    return (
        <UserProvider>
          <MenuProvider>
        <ImageProvider>
            { children }
        </ImageProvider>
          </MenuProvider>
        </UserProvider>
    );
};
