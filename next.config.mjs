/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Remove 'domains' as remotePatterns can handle all cases
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // This allows images from any HTTPS source
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com', // Specifically allow this domain
      },
    ],
  },
  async headers() {
    return [
      {
        // Match all image files and cache for one day
        source: '/(.*)\\.(jpg|jpeg|png|svg|ico)$', // Note: escape the dot (.) and add $ to mark the end
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400', // 86400 seconds = 1 day
          },
        ],
      },
      {
        // Match all HTML files and set no caching
        source: '/(.*)\\.html$', // Escape the dot (.) and add $ to mark the end
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        // Match all font files and cache for one year
        source: '/(.*)\\.(woff|woff2|ttf|otf)$', // Escape the dot (.) and add $ to mark the end
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
