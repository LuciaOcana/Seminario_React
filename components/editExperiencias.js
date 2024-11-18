// components/EditExperiencePage.js
import { useState, useEffect } from 'react';
import ExperienciaForm from './ExperienciaForm';

export default function EditExperiencePage({ experienceId, onUpdateExperience, onCancelEdit }) {
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch de la experiencia a editar desde la API usando el experienceId
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/experiencias/${experienceId}`);
        const data = await response.json();
        setExperience(data);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar la experiencia:', err);
        setError('No se pudo cargar la experiencia.');
        setLoading(false);
      }
    };

    if (experienceId) {
      fetchExperience();
    }
  }, [experienceId]);

  const handleSave = (updatedExperience) => {
    // Actualizar la experiencia editada
    onUpdateExperience(experienceId, updatedExperience);
  };

  if (loading) return <p>Cargando experiencia...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Editar Experiencia</h1>
      {experience && (
        <ExperienciaForm
          currentExperience={experience}
          onSave={handleSave}
          onCancel={onCancelEdit}
        />
      )}
    </div>
  );
}
