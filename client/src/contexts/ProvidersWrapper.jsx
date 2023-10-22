import { MenuProvider } from './MenuContext.jsx';
import { UserProvider } from './UserContext.jsx';
import { ImageProvider } from './ImageContext.jsx';
import { TagsProvider } from './TagsContext.jsx';

export const ProvidersWrapper = ({ children }) => {
    return (
        <UserProvider>
          <MenuProvider>
            <ImageProvider>
               <TagsProvider>
                { children }
               </TagsProvider>
            </ImageProvider>
          </MenuProvider>
        </UserProvider>
    );
};
