import type { Metadata } from 'next';
import { DM_Sans, IBM_Plex_Mono, Instrument_Serif } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { Providers } from '@/components/providers';
import './globals.css';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic']
});

export const metadata: Metadata = {
  title: 'PredictX - Prediction Market Aggregator',
  description:
    'Trade on Polymarket and Opinion Labs from one unified dashboard. Real-time prices, order book depth, and seamless execution.',
  keywords: [
    'prediction market',
    'polymarket',
    'opinion labs',
    'trading',
    'web3',
    'crypto'
  ]
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${ibmPlexMono.variable} ${instrumentSerif.variable} antialiased`}>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
