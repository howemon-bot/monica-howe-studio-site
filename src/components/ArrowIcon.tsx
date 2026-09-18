type ArrowIconProps = {
  className?: string;
  size?: number;
  rotate?: number;
  strokeWidth?: number;
  /** corner = NE link arrow; up = vertical back-to-top arrow */
  direction?: 'corner' | 'up';
};

export default function ArrowIcon({
  className = '',
  size = 16,
  rotate = 0,
  strokeWidth = 1.25,
  direction = 'corner',
}: ArrowIconProps) {
  const d =
    direction === 'up'
      ? 'M8 12.75V3.5M4.25 7.25L8 3.5L11.75 7.25'
      : 'M3.5 12.5L12.5 3.5M5.25 3.5H12.5V10.75';

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
        d={d}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
