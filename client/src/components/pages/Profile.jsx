import { Link } from 'react-router-dom';
import { useProfile } from '../../contexts/ProfileContext';
import { useState, useEffect } from 'react';

function Profile({ children }) {
  const { setAbout, setAvatar, setCountry, setHomeTown, setGender } = useProfile();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

   useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:3003/api/v1/user/profile/get-profile?userId=1`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        
        setAbout(data.about);
        setAvatar(data.avatar);
        setCountry(data.country);
        setHomeTown(data.homeTown);
        setGender(data.gender);

          console.log(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="flex w-full mx-auto my-8 relative">
      <div className={`flex transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-1/4' : 'w-12'} overflow-hidden bg-gray-200`}>
        
        <ul className={`w-full ${sidebarOpen ? 'block' : 'hidden'}`}>
          <li className="p-2 hover:bg-gray-300"><Link to="/profile/about">About</Link></li>
          <li className="p-2 hover:bg-gray-300"><Link to="/profile/logout">Logout</Link></li>
        </ul>
        
        <button 
          className="w-12 flex items-center justify-center" 
          onClick={toggleSidebar}
        >
          {sidebarOpen ? '<' : '>'}
        </button>
      </div>

      <div className="flex-grow bg-white p-4">
        {children}
      </div>
    </div>
  );
}

export default Profile;

