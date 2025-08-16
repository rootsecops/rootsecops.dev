
import type { Metadata } from 'next';
import { Inter, Pixelify_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import AppLayout from '@/components/layout/AppLayout';
import LoadingScreen from '@/components/layout/LoadingScreen';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const pixel = Pixelify_Sans({ subsets: ['latin'], variable: '--font-pixel', weight: '400' });

export const metadata: Metadata = {
  title: 'SONAJIT.0X1 | A Cybersecurity Student',
  description: 'A CYBERSECURITY STUDENT',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body className={`${inter.variable} ${pixel.variable} font-body antialiased`}>
        <ThemeProvider>
          <LoadingScreen />
          <AppLayout>
            {children}
          </AppLayout>
          <Toaster />
        </ThemeProvider>
       <Analytics />
      </body>
    </html>
  );
}