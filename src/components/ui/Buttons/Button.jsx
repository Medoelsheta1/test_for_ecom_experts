import './Button.css';

function Button({
  children,
  fullWidth = false,
  onClick,
  kind,
  className,
}) {
 
   

  return (
    <button
      className={`button button--full-width button--${kind} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;