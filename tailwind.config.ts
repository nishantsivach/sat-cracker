import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        site: {
          primary: "#4F46E5",     
          secondary: "#2563EB",    
          accent: "#14B8A6",       

          // Text colors
          text: "#111827",         
          muted: "#6B7280",       

          // UI colors
          border: "#E5E7EB",
          surface: "#FFFFFF",
          background: "#F8FAFC",

          highlight: "#EEF2FF",   
          success: "#22C55E",      
          warning: "#F59E0B",      
          error: "#EF4444",        
        },
      },
    },
  },
} satisfies Config;