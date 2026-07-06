import './Button.css';

export default function Button({ children, variant = 'primary', href, onClick, className = '', ...props }) {
  const cls = `btn btn--${variant} ${className}`;

  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
