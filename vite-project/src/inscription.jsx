import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const InscriptionPage = () => {
  const [firmName, setFirmName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

const handleSubmit = async (event) => {
  event.preventDefault();

  // Préparation des données à envoyer
  const userData = {
    firm_name: firmName,
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone_number: phoneNumber,
    is_admin: isAdmin
  };

  try {
    const response = await fetch('http://51.83.69.229:3000/api/users/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      // Gestion de la réponse réussie
      console.log('Inscription réussie:', data);
      // Redirection ou mise à jour de l'état ici
    } else {
      // Gestion des erreurs de réponse
      console.error('Erreur lors de l\'inscription:', data.message);
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la requête:', error);
  }
};
  

  return (
    <div>
      <h1>Inscription Entreprise</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nom de l'Entreprise:
          <input
            type="text"
            value={firmName}
            onChange={(e) => setFirmName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Prénom:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Nom:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Téléphone:
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <br />
        <label>
          Admin:
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
        </label>
        <br />
        <button type="submit">S'inscrire</button>
        <p>
          Déjà inscrit ? <Link to="/login">Connectez-vous</Link>
        </p>
      </form>
    </div>
  );
};

export default InscriptionPage;
