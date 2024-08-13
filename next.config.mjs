/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ik.imagekit.io'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [
      {
        // Match all image files and cache for one day
        source: '/(.*).(jpg|jpeg|png|svg|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400', // 86400 seconds = 1 day
          },
        ],
      },
      {
        // Match all HTML files and set no caching
        source: '/(.*).html',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        // Match all font files and cache for one year
        source: '/(.*).(woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year
          },
        ],
      },
    ];
  },
};

export default nextConfig;
