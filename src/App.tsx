import React from 'react';
import HomePage from './components/Home/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';
import ErrorBoundary from './components/ErrorHandlers/ErrorBoundary';
import ErrorPage from './components/ErrorHandlers/ErrorPage';
import './App.css';

const App: React.FC = () => {
  return (
    <div id="App">
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
};

export default App;
