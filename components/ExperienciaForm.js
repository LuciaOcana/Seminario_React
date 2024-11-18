// components/ExperienciaForm.js
import { useState, useEffect } from 'react';

export default function ExperienciaForm({ currentExperience = null, onSubmit, onCancel }) {
  // Estados iniciales, utiliza valores predeterminados si `currentExperience` no está definido
  const [description, setDescription] = useState(currentExperience?.description || '');
  const [owner, setOwner] = useState(currentExperience?.owner || '');
  const [participants, setParticipants] = useState(currentExperience?.participants || []);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // Fetch de los usuarios disponibles desde la API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user`);
        const data = await response.json();
        setUsers(data);
        setLoadingUsers(false);
      } catch (err) {
        console.error('Error al cargar los usuarios:', err);
      }
    };

    fetchUsers();
  }, []);

  // Manejo del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificación de que al menos la descripción y el dueño estén completos
    if (description.trim() && owner) {
      const experiencia = {
        description: description.trim(),
        owner,
        participants,
      };
      onSubmit(experiencia); // Llama a onSave para guardar la experiencia (nueva o editada)
      // Si es una nueva experiencia, resetea el formulario
      if (!currentExperience) {
        setDescription('');
        setOwner('');
        setParticipants([]);
      }
    } else {
      alert('Debes completar todos los campos obligatorios.');
    }
  };

  if (loadingUsers) return <p>Cargando usuarios...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>{currentExperience ? 'Editar Experiencia' : 'Crear Experiencia'}</h2>
      <div>
        <label>Descripción de la experiencia:</label>
        <input
          type="text"
          className='formdiv'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      
      <div>
        <label>Seleccionar dueño:</label>
        <select
          className='formdiv'
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        >
          <option value="">--Selecciona un usuario--</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Seleccionar participantes:</label>
        <select
          className='formdiv'
          multiple
          value={participants}
          onChange={(e) => {
            const selectedParticipants = Array.from(e.target.selectedOptions, option => option.value);
            setParticipants(selectedParticipants);
          }}
        >
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">
        {currentExperience ? 'Guardar Cambios' : 'Crear Experiencia'}
      </button>
      {onCancel && (
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      )}
    </form>
  );
}
