function Button({ name, variant, action, disabled, inProgressText, onClick }) {
  return (
    <button 
      className={`md:max-w-max px-8 py-2 text-base font-medium rounded 
        ${variant === 'primary' ? 'bg-accent text-white' :
                'bg-inherit text-gray-900'}`} 
      type={action} 
      disabled={disabled}
      onClick={onClick}
    >
      {disabled ? inProgressText : name}
    </button>
  );
}

export default Button;

