import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#099921',
    },
    secondary: {
      main: '#c42121',
    },
    text: {
      primary: '#f3c12c',
      secondary: '#fcfcfa',
    },
  },
});

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Dashboard />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
