import hamburgerIcon from '../../assets/hamburger.svg';

function Hamburger({ toggleMenu }) {
    return (
        <button onClick={toggleMenu}>
            <img src={hamburgerIcon} alt="hamburger menu icon" />
        </button>
    )
}

export default Hamburger;
