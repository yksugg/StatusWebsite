import statusLogo from '../assets/logo/status.png';

interface LogoProps {
  onClick?: () => void;
}

export default function Logo({ onClick }: LogoProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center hover:opacity-80 transition-opacity"
      aria-label="Status International UK home"
    >
      <img
        src={statusLogo}
        alt="Status"
        className="h-12 w-auto object-contain"
      />
    </button>
  );
}
