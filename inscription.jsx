import React, { useState } from 'react';

const InscriptionPage = () => {
  const [firmName, setFirmName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Logique pour envoyer les données au serveur
    console.log({ firmName, firstName, lastName, email, phoneNumber, isAdmin });
    // Vous pouvez utiliser fetch ou axios pour envoyer les données
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
