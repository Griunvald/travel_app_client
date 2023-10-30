import { MenuProvider } from './MenuContext.jsx';
import { UserProvider } from './UserContext.jsx';
import { ImageProvider } from './ImageContext.jsx';
import { TagsProvider } from './TagsContext.jsx';
import { EntryProvider } from './EntryContext.jsx';
import { ToastProvider } from './ToastContext.jsx';

export const ProvidersWrapper = ({ children }) => {
    return (
        <UserProvider>
            <ToastProvider>
              <MenuProvider>
                <EntryProvider>
                    <ImageProvider>
                       <TagsProvider>
                        { children }
                       </TagsProvider>
                    </ImageProvider>
                </EntryProvider>
              </MenuProvider>
            </ToastProvider>
        </UserProvider>
    );
};
