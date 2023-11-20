import { MenuProvider } from './MenuContext.jsx';
import { UserProvider } from './UserContext.jsx';
import { ImageProvider } from './ImageContext.jsx';
import { TagsProvider } from './TagsContext.jsx';
import { EntryProvider } from './EntryContext.jsx';
import { ToastProvider } from './ToastContext.jsx';
import { ProfileProvider } from './ProfileContext.jsx';

export const ProvidersWrapper = ({ children }) => {
    return (
        <UserProvider>
            <ToastProvider>
              <MenuProvider>
                <ProfileProvider>
                    <EntryProvider>
                        <ImageProvider>
                           <TagsProvider>
                                { children }
                           </TagsProvider>
                        </ImageProvider>
                    </EntryProvider>
                </ProfileProvider>
              </MenuProvider>
            </ToastProvider>
        </UserProvider>
    );
};
