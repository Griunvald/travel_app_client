import Button from  '../common/Button.jsx';

function Navbar() {
    return (
        <nav className="bg-gray-200">
            <div className="max-w-full px-2 bg-gray-200 ">
                <div className="flex justify-end gap-x-5 my-4 mr-2.5">
                <Button name="Login" type="secondary"/>
                <Button name="Join" type="primary"/>
                </div>
            </div>
        </nav>
    );
} 

export default Navbar;
