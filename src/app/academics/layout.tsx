import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Academics",
  description: "A gateway to my college coursework, assignments, and notes.",
};

export default function AcademicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
