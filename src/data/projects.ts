import telaviHero from '../assets/telavi/hero-collage.jpg';
import telaviLogoCard from '../assets/telavi/logo-card.jpg';
import telaviCup from '../assets/telavi/cup.jpg';
import telaviPencils from '../assets/telavi/pencils.jpg';
import telaviLetterhead from '../assets/telavi/letterhead.jpg';
import telaviBillboard from '../assets/telavi/billboard.jpg';
import telaviWebsite from '../assets/telavi/website-mockup.jpg';

export type ProjectImages = {
  hero: string;
  grid: { src: string; label: string }[];
  wide: string;
  screen: string;
};

export type Project = {
  index: string;
  slug: string;
  name: string;
  client: string;
  year: string;
  type: string;
  brandColor: string;
  problem: string;
  impact: string;
  solution: string;
  images?: ProjectImages;
};

const projects: Project[] = [
  {
    index: '01',
    slug: 'telavi',
    name: 'Telavi',
    client: 'BETTER BRAND LABS',
    year: '2024',
    type: 'Visual identity and implementation',
    brandColor: '#2B3FD6',
    problem:
      "Telavi was shifting from a standard telecom provider to one built around human connection — but the brand hadn't caught up yet.",
    impact:
      'Faster, smoother communication makes human interactions more meaningful. That belief needed to come through visually.',
    solution:
      'A confident, rounded wordmark and a pixel motif carried across stationery, packaging, wayfinding and out-of-home — a system flexible enough to speak in a boardroom deck and a billboard alike.',
    images: {
      hero: telaviHero,
      grid: [
        { src: telaviLogoCard, label: 'Business cards' },
        { src: telaviCup, label: 'Packaging' },
        { src: telaviPencils, label: 'Stationery' },
        { src: telaviLetterhead, label: 'Letterhead' },
      ],
      wide: telaviBillboard,
      screen: telaviWebsite,
    },
  },
  {
    index: '02',
    slug: 'be-casa',
    name: 'Be Casa',
    client: 'HABITANT',
    year: '2022',
    type: 'Visual identity',
    brandColor: '#B25C3F',
    problem:
      'Habitant needed a residential brand that felt like home before a single unit was built — warmth had to do the selling.',
    impact:
      'People choose a home with their gut first. The brand needed to earn trust in a single glance.',
    solution:
      'A soft, materials-led palette and an identity that borrows its texture from the interiors themselves, applied across signage, brochures and the sales gallery.',
  },
  {
    index: '03',
    slug: 'medinaceli',
    name: 'Medinaceli',
    client: 'GENTE CON PRINCIPIOS',
    year: '2024',
    type: 'Brand identity and editorial',
    brandColor: '#6B7A4F',
    problem:
      'A values-driven collective needed a visual language as considered as the principles it stands for.',
    impact:
      'Conviction reads best when it is quiet and consistent, not loud.',
    solution:
      'An editorial system built on a restrained type scale and generous margins, so the writing — not the decoration — carries the brand.',
  },
  {
    index: '04',
    slug: 'worldcoo',
    name: 'Worldcoo',
    client: 'WORLDCOO',
    year: '2023-24',
    type: 'Brand implementation',
    brandColor: '#2E6E5E',
    problem:
      'A micro-donation platform spanning dozens of retail partners needed one brand that stayed legible at checkout-screen size.',
    impact:
      'Every extra second at checkout costs a donation. Clarity had to survive the smallest applications first.',
    solution:
      'A modular mark and a tight component library so partner teams could implement the brand correctly without a design review each time.',
  },
  {
    index: '05',
    slug: 'the-tiny-flea',
    name: 'The Tiny Flea',
    client: 'THE TINY FLEA',
    year: '2026',
    type: 'Illustration and brand identity',
    brandColor: '#C6482E',
    problem:
      'A children’s label needed a character-led identity that could hold its own on packaging, not just a page.',
    impact:
      'Kids notice a character before they notice a name. The identity had to lead with personality.',
    solution:
      'A hand-drawn mascot and a warm, tactile palette built to survive small-run print and big personality alike.',
  },
];

export default projects;

export function getProjectBySlug(slug: string | undefined) {
  if (!slug) return undefined;
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  const previous = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  return { previous, next };
}
