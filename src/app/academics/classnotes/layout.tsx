import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Academics | ClassNotes",
  description: "A collection of my semester notes and study materials from my university coursework.",
};

export default function ClassNotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
