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

const CLIENTS = [
  { src: logoWwf, name: 'WWF' },
  { src: logoWorldcoo, name: 'Worldcoo' },
  { src: logoFutureKind, name: 'Future Kind' },
  { src: logoIe, name: 'IE University' },
  { src: logoBbl, name: 'Better Brand Labs' },
  { src: logoEverydae, name: 'Everydae' },
  { src: logoDior, name: 'Dior' },
  { src: logoGh, name: 'Green Hygiene' },
  { src: logoCmip, name: 'CMIP' },
  { src: logoGiz, name: 'GIZ' },
];

export default function Clients() {
  return (
    <section id="clients" className="clients wrap" aria-labelledby="clients-heading">
      <p id="clients-heading" className="eyebrow clients__eyebrow">
        Some clients
      </p>
      <ul className="clients__grid">
        {CLIENTS.map((c) => (
          <li key={c.name} className="clients__item">
            <img src={c.src} alt={c.name} className="clients__logo" />
          </li>
        ))}
      </ul>
    </section>
  );
}
