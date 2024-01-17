import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../login';
import InscriptionPage from '../inscription';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/inscription" element={<InscriptionPage />} />
        {/* Autres routes... */}
      </Routes>
    </Router>
  );
};

export default App;
