import { useState } from 'react';
import { Link } from 'react-router-dom';

function Profile({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex w-full mx-auto my-8 relative">
      <div className={`flex transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-1/4' : 'w-12'} overflow-hidden bg-gray-200`}>
        
        <ul className={`w-full ${sidebarOpen ? 'block' : 'hidden'}`}>
          <li className="p-2 hover:bg-gray-300"><Link to="/profile/about">About</Link></li>
          <li className="p-2 hover:bg-gray-300"><Link to="/profile/settings">Settings</Link></li>
          <li className="p-2 hover:bg-gray-300"><Link to="/profile/other">Other Section</Link></li>
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

