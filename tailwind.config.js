/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // First website (kunkunyu) colors
        "site1": {
          primary: "#516580",
          secondary: "#94a7bf",
          light: "#f7f7f7",
          accent: "#c1ccd8",
          darkAccent: "#7f7880",
          pink: "#c8a9b8",
          green: "#7e917c",
          blue: "#74a4cc",
        },
        // Second website (sakuraovo) colors
        "site2": {
          primary: "#213954",
          secondary: "#815e61",
          light: "#f9f3ed",
          accent: "#8a97a2",
          gray: "#b8bbc1",
          gold: "#bb8d37",
          purple: "#acabb4",
          tan: "#b5a594",
          teal: "#3faaa8",
        },
        // Third website (liveout) colors
        "site3": {
          primary: "#23232c",
          secondary: "#707678",
          light: "#efe9ec",
          dark: "#0d0d14",
          accent: "#a2b8c3",
          pink: "#9a8588",
          navy: "#293642",
          blue: "#5e80c9",
          brown: "#4b3e40",
        },
        // Fourth website (kunkunyu.com) colors - 技术支持
        "site4": {
          primary: "#516580",
          secondary: "#94a7bf",
          light: "#f7f7f7",
          dark: "#1a2733",
          accent: "#c1ccd8",
          text: "#2c3e50",
          blue: "#74a4cc",
          gray: "#7e917c",
        },
        // Fifth website (Chryssolion ChenSakuraovo) colors
        "site5": {
          primary: "#213b53",
          secondary: "#7f6085",
          accent: "#8897a3",
          light: "#f9f3ed",
          gray: "#b7bcc5",
          gold: "#9c8754",
          soft: "#b79e94",
          purple: "#ada9b8",
          teal: "#40a9a9",
          text: "#2c3e50",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "spin-reverse": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-reverse": "spin-reverse 1.5s linear infinite",
      },
      backgroundImage: {
        'hero-pattern': "url('/images/1.png')",
        'clouds': "url('/images/2005.png')",
        'clouds-bg': "url('/images/1.png')",
        'anime-sea': "url('/images/1.png')",
      },
      fontFamily: {
        'misans': ['MiSans', 'sans-serif'],
        'kuaikan': ['KuaiKanShiJieTi', 'sans-serif'],
        'noto': ['NotoSerifSC', 'serif'],
        'songti': ['SongTi', 'serif'],
        'kaiti': ['KaiTi', 'serif'],
        'future': ['FutureFont', 'sans-serif'],
      },
      zIndex: {
        '-10': '-10',
        '-5': '-5',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            // 让书法字体的标题有更好的显示效果
            'h1, h2, h3, h4': {
              fontWeight: 'normal',
            },
            // 增强技术关键词的辨识度
            'code, pre': {
              backgroundColor: theme('colors.gray.100'),
              borderRadius: theme('borderRadius.md'),
              padding: theme('spacing.1'),
              fontFamily: theme('fontFamily.mono'),
            },
          },
        },
        // 书法风格排版
        calligraphy: {
          css: {
            fontFamily: theme('fontFamily.noto'),
            'h1, h2, h3, h4': {
              fontFamily: theme('fontFamily.kaiti'),
              fontWeight: 'normal',
              letterSpacing: '0.05em',
            },
            p: {
              lineHeight: '1.8',
              letterSpacing: '0.02em',
            },
            strong: {
              fontWeight: 'normal',
              textShadow: '0 0 1px currentColor',
            },
          },
        },
        // 未来风格排版
        futuristic: {
          css: {
            fontFamily: theme('fontFamily.misans'),
            'h1, h2, h3, h4': {
              fontFamily: theme('fontFamily.future'),
              letterSpacing: '0.04em',
            },
            code: {
              fontFamily: theme('fontFamily.mono'),
              backgroundColor: theme('colors.blue.100'),
              color: theme('colors.blue.800'),
            },
          },
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate")],
}
