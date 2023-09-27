import { useMenu } from '../../contexts/MenuContext';
import Button from  '../common/Button.jsx';

const Sidebar = () => {
  const { isOpen, toggleMenu } = useMenu();

  return (
    <>
      <div onClick={toggleMenu} 
           className={`fixed inset-0 bg-black opacity-50 
           ${isOpen ? 'block' : 'hidden'} z-40`} 
      />
      <div className={`fixed top-0 right-0 h-full w-[80%]
          bg-gray-200 transform transition-transform duration-300
          ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}>
      <div className="flex flex-col mx-4.5 gap-y-16 mt-16">
           <Button type="secondary" name="Log in" />
           <Button type="primary" name="Join" />
      </div>
        
      </div>
    </>
  );
};

export default Sidebar;
