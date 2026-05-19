interface LogoProps {
  onClick?: () => void;
}

export default function Logo({ onClick }: LogoProps) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 hover:opacity-80 transition-opacity"
    >
      <div className="bg-[var(--brand-deep)] text-white px-4 py-2 rounded">
        <span className="font-bold text-xl">STATUS</span>
      </div>
      <div className="hidden lg:block">
        <div className="text-sm text-gray-600">International UK</div>
      </div>
    </button>
  );
}
