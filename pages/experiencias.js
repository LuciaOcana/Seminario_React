// pages/experiencias.js
import { useEffect, useState } from 'react';
import ExperienciaList from '../components/ExperienciaList';
import ExperienciaForm from '../components/ExperienciaForm';

export default function Experiencias() {
  const [experiencias, setExperiencias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingExperience, setEditingExperience] = useState(null); // Estado para manejar la experiencia que estamos editando
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
    // Crear experiencia
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
      setExperiencias([...experiencias, data]); // Actualiza la lista de experiencias
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDeleteExperience = async (expId) => {
    // Eliminar experiencia
    try {
      const response = await fetch(`${URL}/${expId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la experiencia');
      }

      setExperiencias(experiencias.filter(exp => exp._id !== expId)); // Actualiza la lista
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditExperience = (exp) => {
    setEditingExperience(exp); // Cuando se hace clic en editar, cargamos la experiencia en el formulario
  };

  const handleCancelEdit = () => {
    setEditingExperience(null); // Cancelar la edición y cerrar el formulario
  };

  const handleUpdateExperience = async (updatedExperience) => {
    // Asegurarse de que updatedExperience contiene el _id
    if (!updatedExperience._id) {
      console.error('Falta el _id para la experiencia');
      return; // No continuamos si no hay un id válido
    }
  
    try {
      const response = await fetch(`${URL}/${updatedExperience._id}`, { // Aseguramos que el id esté presente en la URL
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedExperience),
      });
  
      if (!response.ok) {
        throw new Error('Error al actualizar la experiencia');
      }
  
      const data = await response.json();
      console.log('Experiencia actualizada:', data);
  
      // Actualizamos la lista de experiencias con los datos editados
      setExperiencias(experiencias.map(exp => (exp._id === updatedExperience._id ? data : exp)));
      setEditingExperience(null); // Cerramos el formulario de edición
    } catch (err) {
      console.error('Error al actualizar la experiencia:', err);
    }
  };
  

  return (
    <div className="form-container">
      <h2>Gestión de Experiencias</h2>
      {loading && <p>Cargando experiencias...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          {/* Formulario de Crear Experiencia */}
          <ExperienciaForm
            currentExperience={null} // Para indicar que es un formulario de creación
            onSubmit={handleExperienciaSubmit}
          />

          <div style={{ display: 'flex', marginTop: '20px' }}>
            {/* Si estamos en modo de edición, mostramos el formulario de edición */}
            {editingExperience && (
              <ExperienciaForm
                currentExperience={editingExperience}
                onSubmit={handleUpdateExperience}
                onCancel={handleCancelEdit}
                buttonText="Guardar Cambios"
              />
            )}
          </div>

          <ExperienciaList
            experiencias={experiencias}
            onDeleteExperience={handleDeleteExperience}
            onEditExperience={handleEditExperience} // Pasamos la función de edición
          />
        </>
      )}
    </div>
  );
}
