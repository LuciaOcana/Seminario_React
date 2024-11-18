// components/ExperienciaForm.js

import { useState, useEffect } from 'react';

export default function ExperienciaForm({ currentExperience, onSubmit, onCancel }) {
  const [description, setDescription] = useState(currentExperience?.description || '');
  const [owner, setOwner] = useState(currentExperience?.owner || '');
  const [participants, setParticipants] = useState(currentExperience?.participants || []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedExperience = {
      _id: currentExperience._id, // Asegúrate de que el _id esté presente
      description,
      owner,
      participants,
    };

    onSubmit(updatedExperience);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Descripción:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Dueño:</label>
        <input
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Participantes:</label>
        <input
          type="text"
          value={participants.join(', ')}
          onChange={(e) => setParticipants(e.target.value.split(', '))}
        />
      </div>
      <div>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}
