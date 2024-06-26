import './global.css';
import '@radix-ui/themes/styles.css';
import { CookiesProvider } from 'next-client-cookies/server';
import GoogleAnalytics from '@/components/GoogleAnalytics/GoogleAnalytics';
import Providers from '@/Providers';

import { initAnalytics } from '@/utils/analytics';
import { inter } from './fonts';
import type { Metadata } from 'next';

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  manifest: '/manifest.json',
};

// Stat analytics before the App renders,
// so we can track page views and early events
initAnalytics();

/** Root layout to define the structure of every page
 * https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.className}`}>
      <body className="flex flex-1 flex-col">
        <CookiesProvider>
          <Providers>{children}</Providers>
        </CookiesProvider>
      </body>
      <GoogleAnalytics />
    </html>
  );
}
