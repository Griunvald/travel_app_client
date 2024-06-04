import { toggleMenu } from '../../features/menu/menuSlice';
import { useRef, useEffect } from 'react';
import LinkButton from  '../common/LinkButton.jsx';
import LinkNavbar from '../common/LinkNavbar.jsx';
import { useSelector, useDispatch } from 'react-redux';

const Sidebar = () => {
  const dispatch = useDispatch();
  const sidebarRef = useRef();
  const isOpen = useSelector(store => store.menu.isOpen);
  const { username } = useSelector(store => store.user);
  const { currentTripId } = useSelector(store => store.trip);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
        dispatch(toggleMenu());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, dispatch]);

  return (
    <>
      <div onClick={()=> dispatch(toggleMenu())} 
           className={`fixed inset-0 bg-black opacity-50 
           ${isOpen ? 'block' : 'hidden'} z-40`} 
      />
      <div ref={sidebarRef} className={`fixed top-0 right-0 h-full w-[80%]
          bg-gray-200 transform transition-transform duration-300
          ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}>
      <div className="flex flex-col mx-4.5 gap-y-16 mt-16">
      { username ? 
         (<>
             {currentTripId ? 
                <LinkButton name="Current Trip" variant="primary" path="/current-trip" onClick={()=> dispatch(toggleMenu())}/>:
                <LinkButton name="Start Trip" variant="primary" path="/create-trip" onClick={()=>dispatch(toggleMenu())}/>
             }
                <LinkNavbar name="Discover Journeys" path="/trips-list"  onClick={()=>dispatch(toggleMenu())}/>
                <LinkNavbar name="Profile" path="/profile"  onClick={()=>dispatch(toggleMenu())}/>
          </>)
          :
          (<>
           <LinkButton variant="secondary" name="Log in" path="/login" onClick={()=>dispatch(toggleMenu())}/>
           <LinkButton variant="primary" name="Join" path="/join" onClick={()=>dispatch(toggleMenu())}/>
          </>)
      }
      </div>
        
      </div>
    </>
  );
};

export default Sidebar;

