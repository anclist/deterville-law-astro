// Firm facts. Everything here is sourced from detervillelaw.com — keep it that way.

export const firm = {
  name: 'Deterville Law Office',
  lawyer: 'Nandi A. O. Deterville',
  tagline: 'Canadian Immigration Law and Ontario Estate Planning',
  phone: '(647) 503-8684',
  phoneHref: 'tel:+16475038684',
  whatsappHref: 'https://wa.me/16475038684',
  email: 'info@detervillelaw.com',
  address: {
    line1: '895 Don Mills Road, Suite 900',
    line2: 'Two Morneau Shepell Centre',
    city: 'Toronto, Ontario M3C 1W3',
  },
  mapHref: 'https://maps.google.com/maps?cid=2301623306067250132',
  lsoNumber: '71552S',
  bookHref: '/consultation-documents',
  rating: { score: 4.9, count: 24, source: 'Google' },
} as const;

/** The sister firm in Saint Lucia. Points at its proposal preview; switch to https://detervilleassociates.com at launch. */
export const sister = {
  name: 'Deterville & Associates',
  href: 'https://anclist.github.io/deterville-associates-astro/',
  summary: 'family, property, business and citizenship matters in Saint Lucia',
} as const;

export const nav = [
  { label: 'Immigration', href: '/immigration' },
  { label: 'Wills & Estates', href: '/wills-estates' },
  { label: 'Notarial', href: '/notarial-services' },
  { label: 'Who we are', href: '/who-we-are' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact-us' },
] as const;

export const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/detervillelaw' },
  { label: 'Instagram', href: 'https://www.instagram.com/detervillelaw' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/detervillelaw/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@detervillelaw' },
  { label: 'X', href: 'https://www.x.com/DetervilleLaw' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UC2Xy8NwBTv4A-MOzmF4M9nA' },
] as const;

export type Practice = {
  slug: string;
  href: string;
  title: string;
  short: string;
  summary: string;
  helpsWith: string[];
  forWhom: string;
};

export const practices: Practice[] = [
  {
    slug: 'immigration',
    href: '/immigration',
    title: 'Canadian Immigration',
    short: 'Visit, study, work, or settle in Canada.',
    summary:
      'As a registered Canadian immigration representative, we help you choose and prepare the application to IRCC that gives you the best chance of success for your circumstances.',
    helpsWith: [
      'Choosing the right pathway before you apply',
      'Permanent residence, including Express Entry',
      'Citizenship and citizenship by descent',
      'Temporary residence: visiting, studying and working',
      'Responding to IRCC requests and procedural fairness letters',
    ],
    forWhom: 'People inside Canada and abroad. Consultations happen online, wherever you are.',
  },
  {
    slug: 'wills-estates',
    href: '/wills-estates',
    title: 'Wills & Estates',
    short: 'Wills and powers of attorney for Ontario families.',
    summary:
      'We draft Wills and Powers of Attorney and give you the information you need to make better choices for your loved ones, reducing the cost and uncertainty they face if you become incapable or pass away.',
    helpsWith: [
      'Last Will and Testament',
      'Power of Attorney for Property',
      'Power of Attorney for Personal Care',
      'Naming guardians for minor children',
      'Updating a Will after marriage, separation or a move',
    ],
    forWhom: 'Ontario residents at any stage of life, including newcomers with assets in more than one country.',
  },
  {
    slug: 'notarial-services',
    href: '/notarial-services',
    title: 'Notarial Services',
    short: 'Notarized, certified and authenticated documents.',
    summary:
      'We notarize and certify documents and commission or administer oaths. We also help authenticate documents signed before an Ontario Notary Public for use outside Canada and with foreign consulates in Canada.',
    helpsWith: [
      'Certified true copies',
      'Notarization of signatures',
      'Affidavits and statutory declarations',
      'Commissioning and administering oaths',
      'Authentication for use outside Canada',
    ],
    forWhom: 'Anyone who needs a document accepted by a foreign government, consulate, or institution.',
  },
];

/** The lawyer's own route to Canada — a real chronology, so it's numbered as one. */
export const journey = [
  { place: 'Saint Lucia', detail: 'Born and raised' },
  { place: 'Miami, Florida', detail: 'BA, International Relations, Florida International University' },
  { place: 'England & Wales', detail: 'Called to the Bar, July 2008' },
  { place: 'Saint Lucia', detail: 'Called to the Bar, August 2008, and in general practice' },
  { place: 'Ontario', detail: 'Called to the Bar, January 2017' },
] as const;

export const steps = [
  {
    title: 'Verify your identity',
    body: 'Complete our secure online form with two pieces of government ID. Law Society rules require this before we can advise you.',
  },
  {
    title: 'Book and pay for your consultation',
    body: 'Pay by credit card, or by electronic funds transfer if you live in Canada. We confirm a time that works in your time zone.',
  },
  {
    title: 'Meet and get a plan',
    body: 'Meet online from anywhere in the world, or in person in Toronto. You leave knowing your options and what comes next.',
  },
] as const;

export type Testimonial = { quote: string; name: string; date: string; source: 'Google' | 'Facebook'; href: string };

// Excerpts as published on the review platforms; full text lives at `href`.
export const testimonials: Testimonial[] = [
  { quote: 'Her integrity to do what is right.', name: 'Monica Modeste', date: '2020-04-09', source: 'Facebook', href: 'https://facebook.com/2131386067102121/reviews' },
  { quote: 'Where do I even start? Nandi was recommended…', name: 'Terrell J', date: '2026-07-27', source: 'Google', href: 'https://maps.google.com/maps?cid=2301623306067250132' },
  { quote: 'Ms. Deterville was very helpful.', name: 'Sian Lamontagne', date: '2026-06-21', source: 'Google', href: 'https://maps.google.com/maps?cid=2301623306067250132' },
  { quote: 'I am extremely pleased with the exceptional service…', name: 'Janice Suite', date: '2024-07-22', source: 'Google', href: 'https://maps.google.com/maps?cid=2301623306067250132' },
  { quote: 'Words can’t describe the wonderful work you did…', name: 'Jermael Syahungene', date: '2023-06-19', source: 'Facebook', href: 'https://facebook.com/2131386067102121/reviews' },
  { quote: 'I recommend Nandi for knowledge, experience and…', name: 'Karleen Greenidge', date: '2020-04-29', source: 'Facebook', href: 'https://facebook.com/2131386067102121/reviews' },
];

export const faqs = [
  {
    q: 'I live outside Canada. Can we still meet?',
    a: 'Yes. Most consultations happen online, and we regularly meet clients wherever they are in the world. You can also message us on WhatsApp.',
  },
  {
    q: 'How do I book a consultation?',
    a: 'Start with the client verification form. It confirms your identity, collects the details of your matter and lets you choose how to pay. We then confirm a meeting time.',
  },
  {
    q: 'Is the consultation free?',
    a: 'No. Consultations are paid, by credit card or by electronic funds transfer for Canadian residents. That time is spent on your situation, not a sales call.',
  },
  {
    q: 'Can you notarize documents I need to send abroad?',
    a: 'Yes. We notarize and certify documents and can help with authenticating documents signed before an Ontario Notary Public for use outside Canada or with foreign consulates.',
  },
  {
    q: 'Does contacting you make me a client?',
    a: 'No. A lawyer–client relationship only begins once we have verified your identity and agreed to act for you. Please don’t send confidential details through the general contact form.',
  },
] as const;

export const memberships = [
  'Ontario Bar Association — Women Lawyers Forum (Chair, 2021–2022) and Immigration Law Section executive',
  'Canadian Association of Black Lawyers',
  'Toronto Lawyers Association',
  'Michael Garron Hospital Community Advisory Committee',
  'Michael Garron Hospital Foundation — Planned Giving Committee',
] as const;
