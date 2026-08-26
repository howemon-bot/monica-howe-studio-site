import ArrowIcon from './ArrowIcon';

const PACKAGES = [
  {
    title: ['Logo +', 'Style sheet'],
    scope: ['Research + concept', '2 proposals', '2 applications', 'Style sheet'],
    price: '3,500€',
  },
  {
    title: ['Logo + basic', 'Brand book'],
    scope: ['Research + concept', '2 proposals', '2 applications', 'Basic brand book'],
    price: '4,500€',
  },
];

export default function Packages() {
  return (
    <section id="packages" className="packages wrap">
      <p className="eyebrow packages__eyebrow">Packages</p>

      <hr className="hairline" />
      {PACKAGES.map((pkg) => (
        <div className="packages__row" key={pkg.price}>
          <h3 className="packages__title">
            {pkg.title[0]}
            <br />
            {pkg.title[1]}
          </h3>

          <div className="packages__scope">
            <ul>
              {pkg.scope.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="packages__price">
              Starting from <strong>{pkg.price}</strong>
            </p>
          </div>

          <a href="mailto:monicahowe@studio.com?subject=Booking%20enquiry" className="packages__book link-arrow">
            Book
            <br />
            now <span className="arrow"><ArrowIcon size={16} /></span>
          </a>
        </div>
      ))}
      <hr className="hairline" />

      <a href="mailto:monicahowe@studio.com" className="packages__more" aria-label="Ask about a custom package">
        +
      </a>
    </section>
  );
}
