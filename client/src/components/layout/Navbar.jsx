import { useState, useEffect } from 'react';
//import { useUser } from '../../contexts/UserContext';
import LinkButton from '../common/LinkButton.jsx';
import LinkNavbar from '../common/LinkNavbar.jsx';
import Logo from '../common/Logo.jsx';
import Hamburger from './Hamburger.jsx';
import Avatar from '../common/Avatar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { username } = useSelector(store => store.user);
  const { avatar } = useSelector(store => store.profile);
  const { currentTripId } = useSelector(store => store.trip);

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
    <div className="relative pb-20 md:pb-32">
      <nav className="h-16 bg-secondary flex justify-between fixed top-0 left-0 right-0">
        <div className="flex justify-start items-center ml-4.5">
          <Logo />
        </div>
        <div className="max-w-full flex content-center">
          <div className="flex justify-end items-center gap-x-5 mr-4.5">
            <LinkNavbar name="Discover Journeys" path="/trips-list" />
            {windowWidth > 768 ? (
              username ?
                (<>
                  <Link to="/profile">
                    <Avatar avatar={avatar} size="big" />
                  </Link>
                  {currentTripId ? (
                    <LinkButton name="Current Trip" variant="primary" path="/current-trip" />
                  ) : (
                    <LinkButton name="Start Trip" variant="primary" path="/start-trip" />
                  )}
                </>)
                :
                (<>
                  <LinkButton name="Login" variant="secondary" path="/login" />
                  <LinkButton name="Join" variant="primary" path="/join" />
                </>)

            ) : (
              <Hamburger />
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
