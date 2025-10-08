
import type {NextConfig} from 'next';

const securityHeaders = [
  // Content Security Policy
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self' vercel.live; script-src 'self' 'unsafe-inline' https://vercel.analytics.com https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://picsum.photos https://raw.githubusercontent.com https://see.fontimg.com https://img.shields.io; object-src 'none'; base-uri 'self'; form-action 'self' https://formspree.io; font-src 'self' data:; connect-src 'self' https://vitals.vercel-insights.com https://formspree.io; frame-src 'self' raw.githubusercontent.com;",
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
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/rootsecops/rootsecops/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/rootsecops/rootsecops.dev/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/rootsecops/metawiper/**',
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
