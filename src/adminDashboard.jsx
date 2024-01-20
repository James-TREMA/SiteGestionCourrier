import React, { useState, useEffect, useRef } from 'react';
import './adminDashboard.css';

const AdminDashboard = () => {
  const [clients, setClients] = useState([]);
  const token = localStorage.getItem('token');

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); // Référence pour le menu déroulant

  const toggleDropdown = (event) => {
    event.stopPropagation(); // Empêche le clic de se propager
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    // Fonction pour gérer les clics en dehors du menu déroulant
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    // Ajout de l'écouteur d'événements
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Nettoyage de l'écouteur d'événements
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetch('http://51.83.69.229:3000/api/users/gestionEntreprise', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur réseau: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      setClients(data);
    })
    .catch(error => console.error('Erreur lors de la récupération des clients:', error));
  }, []);

  const handleDelete = (userId) => {
    fetch(`http://51.83.69.229:3000/api/users/delete/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log(response);
      if (response.ok) {
        setClients(clients.filter(client => client._id !== userId));
      } else {
        response.text().then(text => {
          console.error(`Erreur réseau: ${response.status} ${response.statusText}`, text);
          throw new Error(`Erreur réseau: ${response.status} ${response.statusText}`);
        });
      }
    })
    .catch(error => console.error('Erreur lors de la suppression du client:', error));
  };
  
  const handleUpdate = (userId, updatedData) => {
    fetch(`http://51.83.69.229:3000/api/users/update/${userId}`, {
      method: 'PUT', // ou 'PATCH' selon la configuration de votre API
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedData)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Erreur réseau: ${response.status} ${response.statusText}`);
      }
    })
    .then(updatedUser => {
      // Mettre à jour l'état des clients avec les informations de l'utilisateur mis à jour
      setClients(clients.map(client => client._id === userId ? updatedUser : client));
    })
    .catch(error => console.error('Erreur lors de la mise à jour du client:', error));
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <button className="dropdown-button" onClick={toggleDropdown}>Menu</button>
        {showDropdown && (
          <div className="dropdown-content" ref={dropdownRef}>
            <button>Mon compte</button>
            <button>Déconnexion</button>
            {/* Autres boutons */}
          </div>
        )}
      </div>
      <h1>Tableau de Bord de l'Administrateur</h1>
      <table>
        <thead>
          <tr>
            <th>Entreprise</th>
            <th>Nom</th>
            <th>Téléphone</th>
            <th>Mail</th>
            <th>Statut Courrier</th>
            <th>Date de Dernier Passage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client._id}>
              <td>{client.firm_name}</td>
              <td>{client.first_name} {client.last_name}</td>
              <td>{client.phone_number}</td>
              <td>{client.email}</td>
              <td>{client.mail_status}</td>
              <td>{client.last_picked_up}</td>
              <td>
                <button onClick={() => handleDelete(client._id)}>Supprimer</button>
                <button onClick={() => handleUpdate(client._id, {/* Données mises à jour */})}>Modifier</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
