function Button({ name, variant, action }) {
  return (
    <button className={`px-8 py-2 text-lg font-semibold rounded 
        ${variant === 'primary' ? 'bg-black text-white' :
                'bg-inherit text-black'}`} type={action}>
      {name}
    </button>
  );
}

export default Button;

