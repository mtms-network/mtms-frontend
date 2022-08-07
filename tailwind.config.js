const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

const componentPlugins = {
  ".btn": {
    textTransform: "capitalize",
    color: "white",
  },
  ".btn-icon-20": {
    // height: 20,
    // width: 20,
  },
  ".btn-base": {
    width: "100%",
    backgroundColor: "#DAEFFF",
    borderColor: "transparent",
    color: "#0391fe",
    borderRadius: 200,
    borderWidth: 1,
    "&:hover": {
      color: "#0391fe",
      borderColor: "#0391fe",
      backgroundColor: "#DAEFFF",
    },
  },
  ".btn-link-dark": {
    color: "#454545",
    cursor: "pointer",
    backgroundColor: "transparent",
    borderRadius: 200,
    "&:hover": {
      color: "#0391fe",
      borderColor: "#0391fe",
      borderWidth: 1,
    },
  },
  ".btn-link-light": {
    cursor: "pointer",
    color: "black",
  },
  ".btn-link-primary": {
    cursor: "pointer",
    color: "black",
    "&:hover": {
      color: "#0981A2",
    },
  },
  ".btn-text-primary": {
    cursor: "pointer",
    color: "#0391FE",
    fontWeight: 700,
    "&:hover": {
      color: "#0F56B9",
    },
  },
  ".btn-outlined-base": {
    fontWeight: 300,
    color: "#0391fe",
    borderRadius: 200,
    backgroundColor: "#DAEFFF",
    "&:hover": {
      color: "white",
      borderColor: "#0391fe",
      backgroundColor: "#0391fe",
    },
    height: 10,
    minHeight: 34,
  },
  ".btn-fill-base": {
    fontWeight: 300,
    color: "#B0B0B0",
    borderRadius: 200,
    backgroundColor: "#F7F7F7",
    border: 0,
    "&:hover": {
      color: "white",
      borderColor: "#0391fe",
      backgroundColor: "#0391fe",
    },
    height: 10,
    minHeight: 34,
  },
  ".btn-white": {
    fontWeight: 900,
    color: "#454545",
    borderRadius: "20px",
    backgroundColor: "#fff",
    border: 1,
    borderStyle: "solid",
    "&:hover": {
      color: "#454545",
      backgroundColor: "#fff",
    },
  },
  // ".btn-outline-base": {
  //   color: "#000",
  //   borderWidth: 1,
  //   borderColor: "#000",
  //   fontWeight: "bold",
  //   backgroundColor: "white",
  //   "&:hover": {
  //     color: "#0981A2",
  //     borderColor: "#0981A2",
  //     backgroundColor: "rgba(9, 129, 162, 0.1)",
  //   },
  // },
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
  ".border-wallet-button": {
    borderWidth: 1,
    borderColor: "#EBEBEB",
    borderRadius: 20,
  },
  ".nav-link": {
    color: "white",
  },
  ".label-base": {
    color: "black",
    paddingBottom: 8,
  },
  ".bg-slate-base": {
    backgroundColor: "#F7F7F7",
  },
  ".bg-gray-base": {
    backgroundColor: "#F3F5F9",
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
  ".text-gray": {
    color: "#787878",
  },
  ".bg-blue-base": {
    backgroundColor: "#0F56B9",
  },
  ".text-hint": {
    color: "#B0B0B0",
  },
  ".text-black-base": {
    color: "#454545",
  },
  ".bg-disable": {
    backgroundColor: "#F7F7F7",
  },
  ".table-row": {
    ">td": {
      paddingBottom: 10,
      paddingTop: 10,
    },
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
        white: "#fff",
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        lx: "1200px",
        xl: "1440px",
      },
      borderWidth: {
        // DEFAULT: '1px',
        1: "1px",
      },
    },
  },
  variants: {
    lineClamp: ["responsive", "hover"],
  },
  daisyui: {
    styled: true,
    base: true,
    utils: true,
    logs: true,
    colors: [
      {
        ...colors,
        "light-primary": "#0981a21a",
      },
    ],
    themes: [
      {
        app: {
          // primary: "#0981A2",
          // secondary: "#66D1A4",
          primary: "#0391fe",
          secondary: "#DAEFFF",
          stroke: "#00E5FF",
          accent: "#1FB2A6",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
          neutral: "#191D24",
          "base-100": "#454545",
          hint: "#B0B0B0",
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/line-clamp"),
    plugin(({ addUtilities, addComponents, e, prefix, config }) => {
      addComponents(componentPlugins);
    }),
  ],
};
