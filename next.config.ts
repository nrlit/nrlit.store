import type { NextConfig } from "next";

type UseItem = {
  loader: string;
  options: {
    presets?: unknown[];
    [key: string]: unknown;
  };
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizeCss: true,
    turbo: {
      loaders: {
        // Add any custom loaders here if needed
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zest-bd.store",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Adjust the Babel loader for client-side production builds
      config.module?.rules?.forEach((rule: { use?: (UseItem | string)[] }) => {
        if (Array.isArray(rule.use)) {
          rule.use.forEach((useItem) => {
            if (
              typeof useItem === "object" &&
              useItem !== null &&
              "loader" in useItem &&
              useItem.loader === "next-babel-loader"
            ) {
              const babelUseItem = useItem as UseItem;
              babelUseItem.options = {
                ...babelUseItem.options,
                presets: [
                  ...(Array.isArray(babelUseItem.options.presets)
                    ? babelUseItem.options.presets
                    : []),
                  [
                    "next/babel",
                    {
                      "preset-env": {
                        modules: false,
                        targets: {
                          esmodules: true,
                        },
                        bugfixes: true,
                        loose: true,
                      },
                    },
                  ],
                ],
              };
            }
          });
        }
      });
      config.target = "browserslist";
    }

    // Enable tree shaking and dead code elimination
    config.optimization = {
      ...config.optimization,
      usedExports: true,
      sideEffects: true,
    };

    return config;
  },
  // Production-specific options
  productionBrowserSourceMaps: false,
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
