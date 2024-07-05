function Button({ name, variant, type, disabled, inProgressText, isLoading, onClick }) {
  return (
    <button 
      className={`md:max-w-max px-8 py-2 text-base font-medium rounded 
        ${variant === 'primary' ? 'bg-accent text-white' : 'bg-inherit text-gray-900 border border-primary'}
        ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      type={type} 
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? inProgressText : name}
    </button>
  );
}

export default Button;

