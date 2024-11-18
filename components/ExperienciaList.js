// components/ExperienciaList.js
import { useRouter } from 'next/router';

export default function ExperienciaList({ experiencias = [], onDeleteExperience }) {
  const router = useRouter();

  const handleDelete = (id) => {
    if (onDeleteExperience) {
      onDeleteExperience(id);
    }
  };

  const handleEdit = (id) => {
    // Redirige a la página de edición pasando el id en la query string
    router.push(`/edit?id=${id}`);
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
            <button onClick={() => handleEdit(exp._id)}>Editar</button> {/* Botón para editar */}
          </li>
        ))}
      </ul>
    </div>
  );
}
