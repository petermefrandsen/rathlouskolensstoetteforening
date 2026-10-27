import { parse } from 'yaml';

export interface Contact {
  title?: string;
  name?: string;
  phone?: string;
}

export interface Settings {
  logo?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string;
  introTitle?: string;
  introText?: string;
  quotes?: { quote: string; author: string }[];
  mobilePayNumber?: string;
  mobilePayInstructions?: string;
  mobilePayQr?: string;
  membershipFee?: string;
  membershipUrl?: string;
  membershipButtonText?: string;
  donationTitle?: string;
  donationText?: string;
  okTitle?: string;
  okSubtitle?: string;
  okInfoText?: string;
  okSponsorNumber?: string;
  okLink?: string;
  okBanner?: string;
  okLogo?: string;
  grantEmail?: string;
  cvr?: string;
  address?: string;
  galleryTitle?: string;
  gallerySubtitle?: string;
  galleryImages?: { image: string; caption?: string; tag?: string }[];
  contactTitle?: string;
  contactSubtitle?: string;
  contacts?: Contact[];
  bylawsFile?: string;
  bylawsUrl?: string;
  privacyFile?: string;
  privacyUrl?: string;
  termsFile?: string;
  termsUrl?: string;
}

export interface Guide {
  forEditors?: string;
  forDevelopers?: string;
  tipsAndTricks?: string;
}

// The YAML files are bundled at build time. Keystatic's reader needs filesystem access,
// which is not available in the Cloudflare prerender runtime, so it returned no settings
// and every page silently fell back to its hardcoded defaults.
const files = import.meta.glob<string>('/src/content/*/index.yaml', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function load<T>(path: string): T | null {
  const raw = files[path];
  return raw ? (parse(raw) as T | null) : null;
}

export const getSettings = () => load<Settings>('/src/content/settings/index.yaml');
export const getGuide = () => load<Guide>('/src/content/guide/index.yaml');

/** "26391696" -> "26 39 16 96"; anything that is not 8 digits is shown as typed. */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\s+/g, '');
  return /^\d{8}$/.test(digits) ? digits.replace(/(\d{2})(?=\d)/g, '$1 ') : phone;
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}
