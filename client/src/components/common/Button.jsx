function Button({ name, type }) {
  return (
    <button className={`px-8 py-2 text-lg font-semibold rounded 
        ${type === 'primary' ? 'bg-black text-white' :
                'bg-inherit text-black'}`}>
      {name}
    </button>
  );
}

export default Button;

