
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Resume | Sonajit Rabha",
  description: "Public resume for Sonajit Rabha, a cybersecurity professional specializing in VAPT, DFIR, and OSINT.",
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
