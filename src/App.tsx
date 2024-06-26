import { ThemeProvider, createTheme } from '@mui/material';
import { RouterProvider } from 'react-router-dom'

import router from './router'

const theme = createTheme({
  palette: {
    primary: {
      main: '#A61D33',
    },
    secondary: {
      main: '#EDF7ED',
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: 'white',
        },
        containedSecondary: {
          color: 'black',
        },
      },
    }
  }
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )

}

export default App
