import { FaInstagram, FaTwitter } from "react-icons/fa";
import Logo from '../common/Logo';
import Link from '../common/Link'

function Footer() {
  return (
    <footer className="bg-secondary text-black py-6 mt-28">
      <div className="max-w-full mx-auto px-4 flex flex-col md:flex-row md:justify-between items-start md:items-end space-y-6 md:space-y-0">
        <div className="flex flex-col items-center md:items-start space-y-4 md:space-y-6 w-full md:w-auto">
          <div className="mb-4 md:mb-0">
            <Logo />
          </div>

          <div className="flex flex-col md:flex-row md:gap-x-5 mb-4 md:mb-0 space-y-2 md:space-y-0">
            <Link name="About" path='/aboutme'/>
            <Link name="Tutorial" path='/tutorial'/>
            <Link name="Terms & Conditions" path='/terms'/>
            <Link name="Privacy Policy" path='/privacy'/>
          </div>
          
          <div className="text-center md:text-left mt-4 md:mt-0">
            <p>&copy; {new Date().getFullYear()} Road Cronicles. All rights reserved.</p>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end space-y-4 md:space-y-6 w-full md:w-auto">
          <div className="flex justify-center md:justify-end space-x-4 mt-4 md:mt-0">
            <a href="https://www.instagram.com/roadcronicles/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600">
              <FaInstagram size={24} />
            </a>
            <a href="https://twitter.com/roadcronicles" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600">
              <FaTwitter size={24} />
            </a>
          </div>
          <div className="flex justify-center md:justify-end">
            <a href="mailto:info@roadcronicles.com" className="text-black hover:underline">info@roadcronicles.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

