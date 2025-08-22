
import type {NextConfig} from 'next';

const securityHeaders = [
  // Content Security Policy
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self' vercel.live; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.analytics.com https://vercel.live https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://placehold.co https://raw.githubusercontent.com https://see.fontimg.com https://img.shields.io; object-src 'none'; base-uri 'self'; form-action 'self' https://formspree.io; font-src 'self' data:; connect-src 'self' https://vitals.vercel-insights.com https://formspree.io; frame-src 'self' raw.githubusercontent.com;",
  },
  // Prevents clickjacking
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // Prevents browsers from trying to guess the content type
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Tells the browser to use the XSS filter
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  // Controls how much referrer information is sent
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
];


const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
   async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'see.fontimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.shields.io',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
