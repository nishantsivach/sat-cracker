import type { Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                site: {
                    primary: "#1B2A4A",
                    secondary: "#2E5EAA",
                    accent: "#C89B3C",

                    // Text colors
                    text: "#14161B",
                    muted: "#5B6472",

                    // UI colors
                    border: "#E2E4E8",
                    surface: "#FFFFFF",
                    background: "#F7F7F5",

                    highlight: "#EEF1F6",
                    success: "#2F9E44",
                    warning: "#B45309",
                    error: "#DC2626",
                },
            },
            animation: {
                shimmer: "shimmer 2s infinite linear",
            },
            keyframes: {
                shimmer: {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(100%)" },
                },
            },
        },
    },
} satisfies Config;