import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [firmName, setFirmName] = useState('');
  const [fourDigitCode, setFourDigitCode] = useState('');
  const [firms, setFirms] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch('http://51.83.69.229:3000/api/users/gestionEntrepriseFirmName', { signal })
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data.firmNames)) {
          setFirms(data.firmNames);
        } else {
          console.error('La réponse n\'est pas un tableau:', data);
        }
      })
      .catch(error => {
        if (error.name !== 'AbortError') {
          console.error('Erreur lors du chargement des entreprises:', error);
        }
      });

    return () => controller.abort();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!firmName || !fourDigitCode) {
      console.error('Veuillez remplir tous les champs');
      return;
    }

    try {
      const response = await fetch('http://51.83.69.229:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firm_name: firmName, four_digit_code: fourDigitCode }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('firmName', firmName);
        localStorage.setItem('isAdmin', data.is_admin);
        
      // Redirection en fonction du rôle
      if (data.is_admin) {
        navigate('/adminDashboard');
      } else {
        navigate('/userDashboard');
      }

      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
    }
  };

  return (
    <div>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nom de la Firme:
          <select value={firmName} onChange={(e) => setFirmName(e.target.value)}>
            <option value="">Sélectionnez une entreprise</option>
            {firms.map((firm, index) => (
              <option key={index} value={firm}>
                {firm}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Code à Quatre Chiffres:
          <input
            type="password"
            value={fourDigitCode}
            onChange={(e) => setFourDigitCode(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Connexion</button>
        <p>
          Pas encore inscrit ? <Link to="/inscription">Inscrivez-vous</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
