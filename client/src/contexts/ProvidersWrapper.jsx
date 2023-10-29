import { MenuProvider } from './MenuContext.jsx';
import { UserProvider } from './UserContext.jsx';
import { ImageProvider } from './ImageContext.jsx';
import { TagsProvider } from './TagsContext.jsx';
import { EntryProvider } from './EntryContext.jsx';

export const ProvidersWrapper = ({ children }) => {
    return (
        <UserProvider>
          <MenuProvider>
            <EntryProvider>
                <ImageProvider>
                   <TagsProvider>
                    { children }
                   </TagsProvider>
                </ImageProvider>
            </EntryProvider>
          </MenuProvider>
        </UserProvider>
    );
};
