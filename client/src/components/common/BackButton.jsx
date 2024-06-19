
function BackButton({ name, onClick }) {
  return (
    <button 
      className={`md:max-w-max px-8 py-2 text-base font-medium rounded bg-white text-gray-900 border`}
      onClick={onClick}
    >
      { name }
    </button>
  );
}

export default BackButton;

