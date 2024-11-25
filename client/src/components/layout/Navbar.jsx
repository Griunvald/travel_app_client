import { useState, useEffect } from 'react';
import LinkButton from '../common/LinkButton.jsx';
import LinkNavbar from '../common/LinkNavbar.jsx';
import Logo from '../common/Logo.jsx';
import Hamburger from './Hamburger.jsx';
import Avatar from '../common/Avatar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileFromLocalStorage } from '../../features/profile/profileThunks';

function Navbar() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const { username } = useSelector(store => store.user);
  const { avatar } = useSelector(store => store.profile);
  const { currentTripId } = useSelector(store => store.trip);

  useEffect(() => {
    dispatch(getProfileFromLocalStorage());
  }, [dispatch]);

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
      <nav className="h-16 bg-secondary flex justify-between fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-start items-center ml-4.5">
          <Logo />
        </div>
        <div className="max-w-full flex content-center">
          <div className="flex justify-end items-center gap-x-5 mr-4.5">
            {windowWidth > 768 ? (
              username ?
                (<>
                  <LinkNavbar name="Discover Journeys" path="/trips-list" />
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

