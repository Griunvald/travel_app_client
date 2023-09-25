import hamburgerIcon from '../../assets/hamburger.svg';
import { useMenu } from  '../../contexts/MenuContext.jsx'

function Hamburger() {
    const { toggleMenu } = useMenu();
    return (
        <button onClick={toggleMenu}>
            <img src={hamburgerIcon} alt="hamburger menu icon" />
        </button>
    )
}

export default Hamburger;
