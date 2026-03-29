export default function Loader({ size = 'md', text = 'Loading...' }) {
  const sizes = { sm: 'w-6 h-6', md: 'w-10 h-10', lg: 'w-16 h-16' };

  return (
    <div className="flex flex-col items-center justify-center gap-4" role="status" aria-label={text}>
      <div className={`${sizes[size]} relative`}>
        <div className="absolute inset-0 border-2 border-gold/20 rounded-full" />
        <div className="absolute inset-0 border-2 border-transparent border-t-gold rounded-full animate-spin" />
      </div>
      {text && (
        <p className="font-mono text-xs tracking-widest uppercase text-muted animate-pulse">{text}</p>
      )}
    </div>
  );
}