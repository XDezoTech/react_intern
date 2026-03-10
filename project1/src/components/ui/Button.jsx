import { motion } from 'framer-motion';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  href,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center font-body tracking-widest text-xs uppercase font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[44px]';

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-xs',
    lg: 'px-8 py-4 text-sm',
  };

  const variants = {
    primary: 'bg-terracotta-500 text-white hover:bg-terracotta-600 focus:ring-terracotta-400',
    secondary: 'bg-navy-900 text-white hover:bg-navy-800 focus:ring-navy-500',
    outline: 'border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white focus:ring-navy-500',
    'outline-white': 'border-2 border-white text-white hover:bg-white hover:text-navy-900 focus:ring-white',
    ghost: 'text-navy-900 hover:bg-sand-100 focus:ring-sand-300',
    sand: 'bg-sand-100 text-navy-900 hover:bg-sand-200 focus:ring-sand-300',
  };

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
