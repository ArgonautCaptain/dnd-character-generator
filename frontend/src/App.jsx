import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Home from './components/Home';
import CreateCharacter from './components/CreateCharacter';
import CharacterDetails from './components/CharacterDetails';
import AbilityScores from './components/AbilityScores';
import CharacterSheet from './components/CharacterSheet';
import EditCharacter from './components/EditCharacter';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF0000',
    },
    secondary: {
      main: '#ED2100',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app-container">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateCharacter />} />
            <Route path="/character/:id/details" element={<CharacterDetails />} />
            <Route path="/character/:id/abilities" element={<AbilityScores />} />
            <Route path="/character/:id" element={<CharacterSheet />} />
            <Route path="/character/:id/edit" element={<EditCharacter />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
