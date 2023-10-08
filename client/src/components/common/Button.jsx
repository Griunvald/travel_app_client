function Button({ name, variant, action }) {
  return (
    <button className={`px-8 py-2 text-base font-medium rounded 
        ${variant === 'primary' ? 'bg-accent text-white' :
                'bg-inherit text-gray-900'}`} type={action}>
      {name}
    </button>
  );
}

export default Button;

