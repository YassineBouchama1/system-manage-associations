import {Pathnames} from 'next-intl/navigation';

export const locales = ['fr', 'ar'] as const;

export const pathnames = {
  '/': '/',
  '/pathnames': {
    fr: '/pathnames',
    ar: '/pfadnamen'
  }
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;
