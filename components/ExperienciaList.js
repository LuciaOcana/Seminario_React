// components/ExperienciaList.js

import { useEffect, useState } from 'react';

export default function ExperienciaList({ experiencias = [], onDeleteExperience, onEditExperience }) { // Recibir onEditExperience como prop
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (loading) return <p>Cargando experiencias...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleDelete = (id) => {
    // Llamar a la función pasada desde el componente padre
    if (onDeleteExperience) {
      onDeleteExperience(id);
    }
  };

  const handleEdit = (exp) => {
    // Llamar a la función pasada desde el componente padre para editar
    if (onEditExperience) {
      onEditExperience(exp);
    }
  };

  return (
    <div>
      <h2>Lista de Experiencias</h2>
      <ul>
        {experiencias.map((exp) => (
          <li key={exp._id}>
            <p><strong>Descripción:</strong> {exp.description}</p>
            <p><strong>Dueño:</strong> {exp.owner}</p>
            <p><strong>Participantes:</strong> {exp.participants.join(', ')}</p>
            <button onClick={() => handleDelete(exp._id)}>Eliminar</button> {/* Botón para eliminar */}
            <button onClick={() => handleEdit(exp)}>Editar</button> {/* Botón para editar */}
          </li>
        ))}
      </ul>
    </div>
  );
}
