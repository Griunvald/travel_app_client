import Button from  '../common/Button.jsx';
import Logo from '../common/Logo.jsx';
import Hamburger from '../common/Hamburger.jsx';

function Navbar() {
    return (
        <nav className="bg-gray-200 flex justify-between">
            <div className="flex justify-start items-center ml-4.5">
               <Logo />
            </div>
            <div className="max-w-full bg-gray-200">
                <div className="flex justify-end gap-x-5 my-4 mr-4.5">
                <Button name="Login" type="secondary"/>
                <Button name="Join" type="primary"/>
        <Hamburger />
                </div>
            </div>
        </nav>
    );
} 

export default Navbar;
