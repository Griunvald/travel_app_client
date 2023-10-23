import closeIcon from '../../assets/close.svg'
function CloseButton({ onClick }) {
  return (
    <button className="absolute top-0 right-0 p-2" onClick={onClick}>
      <img src={closeIcon} alt="close icon" />
    </button>
  );
}

export default CloseButton;

