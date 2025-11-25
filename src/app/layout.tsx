
import type { Metadata } from 'next';
import { Inter, Pixelify_Sans, VT323, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import AppLayout from '@/components/layout/AppLayout';
import LoadingScreen from '@/components/layout/LoadingScreen';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const pixel = Pixelify_Sans({ subsets: ['latin'], variable: '--font-pixel', weight: '400' });
const vt323 = VT323({ subsets: ['latin'], variable: '--font-special', weight: '400' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Sonajit0x1 - Cybersecurity Researcher | Red Teamer',
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
      <body className={`${inter.variable} ${pixel.variable} ${vt323.variable} ${jakarta.variable} font-body antialiased`}>
        <ThemeProvider>
          <LoadingScreen />
          <AppLayout>
            {children}
          </AppLayout>
          <Toaster />
        </ThemeProvider>
       <Analytics />
       <SpeedInsights />
      </body>
    </html>
  );
}
