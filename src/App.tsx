import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { usePersistence } from './hooks/usePersistence';
import { AddItemForm } from './components/AddItemForm/index';
import { ShoppingList } from './components/ShoppingList';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  usePersistence();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <AddItemForm />
        <ShoppingList />
      </Container>
    </ThemeProvider>
  );
}

export default App; 