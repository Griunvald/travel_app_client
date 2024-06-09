function Button({ name, variant, action, disabled, inProgressText, onClick }) {
  return (
    <button 
      className={`md:max-w-max px-8 py-2 text-base font-medium rounded 
        ${variant === 'primary' ? 'bg-accent text-white' : 'bg-inherit text-gray-900 border border-primary'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} 
      type={action} 
      disabled={disabled}
      onClick={onClick}
    >
      {disabled && inProgressText ? inProgressText : name}
    </button>
  );
}

export default Button;

