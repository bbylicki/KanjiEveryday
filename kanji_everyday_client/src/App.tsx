import './App.css';
import { HelloWorld } from './components/KanjiComponent';
import { ThemeProvider } from 'styled-components';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <HelloWorld />
      </div>
    </ThemeProvider>
  );
}

export default App;
