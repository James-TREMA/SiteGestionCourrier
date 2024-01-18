import React, { useState, useEffect } from 'react';
import './adminDashboard.css';

const AdminDashboard = () => {
  const [clients, setClients] = useState([]);
  const token = localStorage.getItem('token');

  const [editableFirmName, setEditableFirmName] = useState('');
  const [editableFirstName, setEditableFirstName] = useState('');
  const [editableLastName, setEditableLastName] = useState('');
  const [editablePhoneNumber, setEditablePhoneNumber] = useState('');
  const [editableEmail, setEditableEmail] = useState('');
  const [editableMailStatus, setEditableMailStatus] = useState('');
  const [editableLastPickedUp, setEditableLastPickedUp] = useState('');

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
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new TypeError("La réponse n'est pas du JSON");
      }
      return response.json();
    })
    .then(data => {
      console.log(data); // Ajoutez cette ligne pour afficher les données
      setClients(data);
    })
    .catch(error => console.error('Erreur lors de la récupération des clients:', error));
  }, []);

    // Gestionnaire pour les changements dans les champs de saisie
    const handleInputChange = (e, clientId, field) => {
      if (clientId === client._id) {
        switch (field) {
          case 'firm_name':
            setEditableFirmName(e.target.value);
            break;
          case 'first_name':
            setEditableFirstName(e.target.value);
            break;
          case 'phone_number':
            setEditableFirstName(e.target.value);
            break;
          case 'email':
            setEditableFirstName(e.target.value);
            break;
          case 'mail_status':
            setEditableFirstName(e.target.value);
            break;
        case 'last_picked_up':
            setEditableFirstName(e.target.value);
            break;
                  
        }
      }
    };

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
