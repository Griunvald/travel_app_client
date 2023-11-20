import { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export const useProfile = () => {
    const context = useContext(ProfileContext);
    return context;
}

export const ProfileProvider = ({ children }) => {
    const [about, setAbout] = useState('');
    const [avatar, setAvatar] = useState('');
    const [country, setCountry] = useState('');
    const [homeTown, setHomeTown] = useState('');
    const [gender, setGender] = useState('');

    return (
        <ProfileContext.Provider value={{ about, avatar, country, homeTown, gender }} >
            { children }
        </ProfileContext.Provider>
    );
}

