import { MenuProvider } from './MenuContext.jsx';
import { UserProvider } from './UserContext.jsx';
import { ImageProvider } from './ImageContext.jsx';
import { TagsProvider } from './TagsContext.jsx';
import { EntryProvider } from './EntryContext.jsx';
import { ToastProvider } from './ToastContext.jsx';
import { ProfileProvider } from './ProfileContext.jsx';
import { FollowProvider } from './FollowContext.jsx';
import { TripsProvider } from './TripsPreviewContext.jsx';

export const ProvidersWrapper = ({ children }) => {
    return (
        <UserProvider>
            <ToastProvider>
             <FollowProvider>
                <MenuProvider>
                  <TripsProvider>
                    <ProfileProvider>
                      <EntryProvider>
                          <ImageProvider>
                             <TagsProvider>
                                  { children }
                             </TagsProvider>
                          </ImageProvider>
                        </EntryProvider>
                      </ProfileProvider>
                    </TripsProvider>
                </MenuProvider>
              </FollowProvider>
            </ToastProvider>
        </UserProvider>
    );
};
