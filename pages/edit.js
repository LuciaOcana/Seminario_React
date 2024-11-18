// pages/edit.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ExperienciaForm from '../components/ExperienciaForm';

export default function EditExperiencePage() {
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query; // Obtenemos el id desde la query string

  // Cargar la experiencia a editar usando el id desde la URL
  useEffect(() => {
    if (id) {
      const fetchExperience = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/experiencias/${id}`);
          const data = await response.json();
          setExperience(data);
          setLoading(false);
        } catch (err) {
          console.error('Error al cargar la experiencia:', err);
          setError('No se pudo cargar la experiencia.');
          setLoading(false);
        }
      };
      fetchExperience();
    }
  }, [id]); // Solo ejecutamos este efecto cuando el `id` cambia

  const handleSave = async (updatedExperience) => {
    try {
      const response = await fetch(`http://localhost:3000/api/experiencias/${updatedExperience._id}`, {
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
      router.push('/experiencias'); // Redirige a la página de experiencias después de guardar
    } catch (err) {
      console.error('Error al guardar los cambios:', err);
      setError('Hubo un problema al guardar los cambios.');
    }
  };

  const handleCancel = () => {
    router.push('/experiencias'); // Redirigir a la página de experiencias sin guardar
  };

  if (loading) return <p>Cargando experiencia...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Editar Experiencia</h1>
      {experience && (
        <ExperienciaForm
          currentExperience={experience} // Pasa la experiencia cargada para edición
          onSubmit={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
