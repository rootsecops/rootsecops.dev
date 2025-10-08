import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Academics | Codes",
  description: "A repository of my coding assignments and programs, including Data Structures, OOPs, and more.",
};

export default function CodesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
