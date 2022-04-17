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
  ".btn-link-primary": {
    cursor: "pointer",
    color: "black",
    "&:hover": {
      color: "#0981A2",
    },
  },
  ".btn-outlined-base": {
    fontWeight: 300,
    color: "#0981A2",
    backgroundColor: "rgba(9, 129, 162, 0.1)",
    "&:hover": {
      color: "white",
      backgroundColor: "#0981A2",
    },
  },
  ".btn-fill-base": {
    fontWeight: 300,
    color: "#1F1F1F",
    backgroundColor: "#F7F7F7",
    border: 0,
    "&:hover": {
      color: "#0981A2",
      borderColor: "#0981A2",
      backgroundColor: "rgba(9, 129, 162, 0.1)",
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
  ".border-group": {
    borderWidth: 1.5,
    borderColor: " #EBEBEB",
    borderRadius: 10,
  },
  ".nav-link": {
    color: "white",
  },
  ".label-base": {
    color: "black",
    paddingBottom: 12,
  },
  ".bg-white": {
    backgroundColor: "#fff",
  },
  ".bg-black": {
    backgroundColor: "#000",
  },
  ".text-white": {
    color: "#fff",
  },
  ".text-black": {
    color: "#000",
  },
  ".text-cl-base": {
    color: "#1F1F1F",
  },
};
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "text-200": "rgba(255, 255, 255, 0.4)",
        "color-base-100": "rgba(255, 255, 255, 0.02)",
        "color-base-200": "rgba(255, 255, 255, 0.1)",
        "dark-base": "#1D2122",
        "gray-base-100": "#F7F7F7",
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      borderWidth: {
        // DEFAULT: '1px',
        1: "1px",
      },
    },
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
