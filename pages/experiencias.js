import { useState, useEffect } from 'react';
import ExperienciaList from '../components/ExperienciaList';
import ExperienciaForm from '../components/ExperienciaForm';

export default function Experiencias() {
  const [experiencias, setExperiencias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingExperience, setEditingExperience] = useState(null); // Añadir estado para la experiencia en edición

  const URL = "http://localhost:3000/api/experiencias";

  useEffect(() => {
    setLoading(true);
    const fetchExperiencias = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setExperiencias(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchExperiencias();
  }, []);

  const handleExperienciaSubmit = async (newExperiencia) => {
    // Si estamos editando, actualizamos la experiencia
    if (editingExperience) {
      // Actualizar la experiencia
      try {
        const response = await fetch(`${URL}/${editingExperience._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newExperiencia),
        });

        if (!response.ok) {
          throw new Error('Error al actualizar la experiencia');
        }

        const data = await response.json();
        // Actualizamos la lista de experiencias
        setExperiencias(experiencias.map((exp) => (exp._id === data._id ? data : exp)));
        setEditingExperience(null); // Limpiamos el estado de edición
      } catch (err) {
        console.error(err.message);
      }
    } else {
      // Crear nueva experiencia
      try {
        const response = await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newExperiencia),
        });

        if (!response.ok) {
          throw new Error('Error al crear la experiencia');
        }

        const data = await response.json();
        setExperiencias([...experiencias, data]);
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  const handleDeleteExperience = async (expId) => {
    try {
      const response = await fetch(`${URL}/${expId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la experiencia');
      }

      setExperiencias(experiencias.filter((exp) => exp._id !== expId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditExperience = (experience) => {
    setEditingExperience(experience); // Establecemos la experiencia en edición
  };

  return (
    <div className="form-container">
      <h2>Gestión de Experiencias</h2>
      {loading && <p>Cargando experiencias...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <ExperienciaList
            experiencias={experiencias}
            onDeleteExperience={handleDeleteExperience}
            onEditExperience={handleEditExperience}
          />
          <ExperienciaForm
            currentExperience={editingExperience}
            onSubmit={handleExperienciaSubmit}
            onCancel={() => setEditingExperience(null)} // Limpia la experiencia en edición
          />
        </>
      )}
    </div>
  );
}
