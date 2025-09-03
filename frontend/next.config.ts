import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    webpackDevMiddleware: (config) => {
        config.watchOptions = {
            ...config.watchOptions,
            ignored: [
                "**/.git/**",
                "**/.vs/**",        // 👈 add this
                "**/node_modules/**",
                "**/.next/**",
                "**/.turbo/**",
                "**/dist/**",
                "**/build/**",
                "**/coverage/**",
                "**/*.log",
            ],
            poll: 1000,            // windows-friendly
            aggregateTimeout: 300, // debounce
        };
        return config;
    },
    eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
