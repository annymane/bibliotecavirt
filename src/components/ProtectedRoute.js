// src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importar el contexto de autenticación

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth(); // Obtener el estado del usuario desde el contexto de autenticación

  return user ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
