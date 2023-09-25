import { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

export const useMenu = () => {
    const context = useContext(MenuContext);
    if(!context) {
        throw new Error('useMenu must be used within a MenuProvider');
    }

    return context;
};

export const MenuProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <MenuContext.Provider value={{ isOpen, toggleMenu }}>
          {children}
        </MenuContext.Provider>
    );
}
