import * as React from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export const theme = createTheme({
  status: {
    danger: "100px",
  },
});

// export default function CustomStyles() {
//   return (
//     <ThemeProvider theme={theme}>
     
//     </ThemeProvider>
//   );
// }