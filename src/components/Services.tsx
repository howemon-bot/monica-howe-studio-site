import './Services.css';

const SERVICES = [
  'Visual identity',
  'Art direction',
  'Editorial',
  'Motion',
  'Brand implementation',
  'Illustration',
  'Web',
];

function ServicesTrack() {
  return (
    <ul className="services__track" aria-hidden="true">
      {SERVICES.map((s) => (
        <li key={s}>
          <span>{s}</span>
          <span className="services__sep" aria-hidden="true">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Services() {
  return (
    <div className="services" role="presentation">
      <p className="visually-hidden">Services: {SERVICES.join(', ')}</p>
      <div className="services__marquee">
        <ServicesTrack />
        <ServicesTrack />
      </div>
    </div>
  );
}
