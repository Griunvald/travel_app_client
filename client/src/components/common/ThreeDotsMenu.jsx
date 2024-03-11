import  { useState, useRef, useEffect } from 'react';

const ThreeDotsMenu = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button onClick={() => setIsOpen(!isOpen)} className=" pl-2 ml-2 text-gray-700 hover:text-gray-900 focus:outline-none">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute right-0 mt-4 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded shadow-lg z-50">
          {menuItems.map((item, index) => (
            <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={item.action}>
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThreeDotsMenu;
