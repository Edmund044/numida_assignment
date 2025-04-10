import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Change primary color
    },
    secondary: {
      main: "#dc004e", // Change secondary color
    },
    background: {
      default: "#f4f6f8", // Background color
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "50px", // Round edges
          textTransform: "none", // Prevent uppercase text
          padding: "10px 20px", // Adjust padding
          minWidth: "200px", // Set a minimum width for all buttons
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "50px", // Makes all input fields rounded
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined", // Ensures all TextFields use outlined variant
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "20px", // Makes all Card components rounded
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)", // Optional: Soft shadow
        },
      },
    },
  },
});

export default theme;
