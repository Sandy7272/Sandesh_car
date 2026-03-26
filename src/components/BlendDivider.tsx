type BlendDividerProps = {
  className?: string;
};

export default function BlendDivider({ className = "" }: BlendDividerProps) {
  return (
    <div className={`relative pointer-events-none h-10 md:h-14 ${className}`} aria-hidden>
      {/* soft black blend */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-transparent" />
      {/* faint warm highlight like reference */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-[#6a3a2a]/55 to-transparent opacity-70" />
      {/* subtle diffusion (kept light for performance) */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-6 bg-black/40 blur-md opacity-60" />
    </div>
  );
}

