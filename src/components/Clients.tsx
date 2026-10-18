import logoWwf from '../assets/clients/1_MH_Client_wwf.png';
import logoWorldcoo from '../assets/clients/2_MH_CLient_Worldcoo.png';
import logoFutureKind from '../assets/clients/3_MH_CLient_FutureKind.png';
import logoBbl from '../assets/clients/4_MH_Client_BBL.png';
import logoIe from '../assets/clients/5_MH_CLient_IE.png';
import logoEverydae from '../assets/clients/6_MH_Client_Everydae.png';
import logoDior from '../assets/clients/7_MH_Client_Dior.png';
import logoGh from '../assets/clients/8_MH_Client_GH.png';
import logoCmip from '../assets/clients/9_MH_Client_CMIP.png';
import logoGiz from '../assets/clients/10_MH_Client_giz.png';
import './Clients.css';

// ratio = width / height of each logo file (trimmed to the visible artwork).
const CLIENTS = [
  { src: logoWwf, name: 'WWF', ratio: 0.671 },
  { src: logoWorldcoo, name: 'Worldcoo', ratio: 1.707 },
  { src: logoFutureKind, name: 'Future Kind', ratio: 6.475 },
  { src: logoIe, name: 'IE University', ratio: 1.177 },
  { src: logoBbl, name: 'Better Brand Labs', ratio: 12.065 },
  { src: logoEverydae, name: 'Everydae', ratio: 3.805 },
  { src: logoDior, name: 'Dior', ratio: 2.375 },
  { src: logoGh, name: 'Green Hygiene', ratio: 5.745 },
  { src: logoCmip, name: 'CMIP', ratio: 1.092 },
  { src: logoGiz, name: 'GIZ', ratio: 3.647 },
];

// Optical sizing: give every logo roughly the same area, so long wordmarks
// don't dwarf compact emblems. 1 = the base height set in CSS (--logo-h).
const REFERENCE_RATIO = 2.5;
function heightScale(ratio: number) {
  return Math.min(1.35, Math.max(0.45, Math.sqrt(REFERENCE_RATIO / ratio)));
}

function LogoTrack({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="clients__track" aria-hidden={hidden || undefined}>
      {CLIENTS.map((c) => (
        <li key={c.name} className="clients__item">
          <img
            src={c.src}
            alt={hidden ? '' : c.name}
            className="clients__logo"
            style={{ '--k': heightScale(c.ratio).toFixed(3) } as React.CSSProperties}
          />
        </li>
      ))}
    </ul>
  );
}

export default function Clients() {
  return (
    <section id="clients" className="clients" aria-labelledby="clients-heading">
      <div className="wrap">
        <p id="clients-heading" className="eyebrow clients__eyebrow">
          Some clients
        </p>
      </div>
      {/* Six identical tracks scroll left by half their width, then loop. Each half
          holds the list three times, so it always covers even very wide screens. */}
      <div className="clients__marquee">
        <div className="clients__marquee-inner">
          <LogoTrack />
          <LogoTrack hidden />
          <LogoTrack hidden />
          <LogoTrack hidden />
          <LogoTrack hidden />
          <LogoTrack hidden />
        </div>
      </div>
    </section>
  );
}
