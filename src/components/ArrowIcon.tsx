type ArrowIconProps = {
  className?: string;
  size?: number;
  rotate?: number;
};

export default function ArrowIcon({ className = '', size = 16, rotate = 0 }: ArrowIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      <path
        d="M3.8 12.2C6.2 8.4 9.4 5.6 12.4 3.6"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d="M7.2 3.5H12.5V8.8"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
