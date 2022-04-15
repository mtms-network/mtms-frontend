const plugin = require("tailwindcss/plugin");

const componentPlugins = {
  ".btn": {
    textTransform: "capitalize",
  },
  ".btn-base": {
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
  },
  ".btn-link-dark": {
    color: "rgba(255, 255, 255, 0.4)",
    cursor: "pointer",
    "&:hover": {
      color: "white",
    },
  },
  ".btn-link-light": {
    cursor: "pointer",
    "&:hover": {
      color: "white",
    },
  },
  ".form-base": {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.02)",
  },
  ".border-base": {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
  },
};
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      "text-200": "rgba(255, 255, 255, 0.4)",
      "color-base-100": "rgba(255, 255, 255, 0.02)",
      "color-base-200": "rgba(255, 255, 255, 0.1)",
      "dark-base": "#1D2122",
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {},
  },
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    themes: [
      {
        app: {
          primary: "#0981A2",
          secondary: "#66D1A4",
          stroke: "#00E5FF",
          accent: "#1FB2A6",
          neutral: "#191D24",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
          // "base-100": "#1D2122",
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
    plugin(function ({ addUtilities, addComponents, e, prefix, config }) {
      addComponents(componentPlugins);
    }),
  ],
};
