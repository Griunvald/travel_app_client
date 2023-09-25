import { MenuProvider } from './MenuContext.jsx';

export const ProvidersWrapper = ({ children }) => {
    return (
      <MenuProvider>
        { children }
      </MenuProvider>
    );
};
