function Button({ name, type }) {
  return (
    <button className={`px-3 py-2 text-lg font-semibold rounded 
        ${type === 'primary' ? 'bg-green-600 text-white' :
                'bg-inherit text-black border-black border-solid border-2'}`}>
      {name}
    </button>
  );
}

export default Button;

