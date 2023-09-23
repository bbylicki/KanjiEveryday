import './App.css';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, DarkTheme, ThemeProvider, BaseProvider } from 'baseui';
import { Client as Styletron } from 'styletron-engine-atomic';
import { LandingPage } from './components/LandingPage';


const engine = new Styletron();

function App() {
  return (
  <StyletronProvider value={engine}>
    <BaseProvider theme={LightTheme}>
      <LandingPage />
    </BaseProvider>
  </StyletronProvider>
  );
}

export default App;
