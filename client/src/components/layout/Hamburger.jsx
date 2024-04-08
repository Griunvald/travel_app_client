import hamburgerIcon from '../../assets/hamburger.svg';
//import { useMenu } from  '../../contexts/MenuContext.jsx'
import { toggleMenu } from '../../features/menu/menuSlice';
import { useDispatch } from 'react-redux';

function Hamburger() {
  const dispatch = useDispatch();
    const  handleClick = () => {
       dispatch(toggleMenu()); 
    }
    return (
        <button className="py-1.5" onClick={handleClick}>
            <img src={hamburgerIcon} alt="hamburger menu icon" />
        </button>
    )
}

export default Hamburger;
