import { useMenu } from '../../contexts/MenuContext';

const Sidebar = () => {
  const { isOpen, toggleMenu } = useMenu();

  return (
    <>
      <div onClick={toggleMenu} 
           className={`fixed inset-0 bg-black opacity-50 ${isOpen ? 'block' : 'hidden'} z-40`} 
      />
      <div className={`fixed top-0 right-0 h-full w-[80%] bg-gray-900 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}>
        {/* Sidebar content here */}
        <p className="text-white p-8">Hello, I'm your sidebar!</p>
      </div>
    </>
  );
};

export default Sidebar;

