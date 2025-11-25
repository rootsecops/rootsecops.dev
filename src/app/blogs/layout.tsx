import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Blog | RootSecOps's blog",
  description: "A collection of articles on cybersecurity, tech, and other interests by RootSecOps.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
