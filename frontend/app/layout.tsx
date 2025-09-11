import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/shared/layout/theme-provider';
import './globals.css';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'RONR',
  description: '',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <html lang='en' suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <SessionProvider>{children}</SessionProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
