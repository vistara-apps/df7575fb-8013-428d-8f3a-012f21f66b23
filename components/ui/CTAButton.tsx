interface CTAButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function CTAButton({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  className = '',
}: CTAButtonProps) {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:opacity-90 disabled:opacity-50',
    secondary: 'bg-surface text-textPrimary hover:bg-opacity-80 disabled:opacity-50',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-50',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
}
