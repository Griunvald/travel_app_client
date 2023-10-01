import { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import LinkButton from  '../common/LinkButton.jsx';
import Logo from '../common/Logo.jsx';
import Hamburger from '../common/Hamburger.jsx';
import Avatar from '../common/Avatar';
import { Link } from 'react-router-dom';

function Navbar() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { username } = useUser();

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <nav className="bg-gray-200 flex justify-between">
            <div className="flex justify-start items-center ml-4.5">
               <Logo />
            </div>
            <div className="max-w-full bg-gray-200">
                <div className="flex justify-end gap-x-5 my-4 mr-4.5">
        { windowWidth > 768 ? (
            username ? (<Avatar/>) : 

            (<>
                <LinkButton name="Login" variant="secondary" path="/login"/>
                <LinkButton name="Join" variant="primary" path="/join"/>
            </>)
            
        ) : (
                <Hamburger />
        )}
                </div>
            </div>
        </nav>
    );
} 

export default Navbar;
