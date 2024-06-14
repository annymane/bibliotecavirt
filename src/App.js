// src/App.js

// PARA IMPORTAR LOS ARCHIVOS DE MIS RUTAS
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// Importar componentes
import Login from './components/Login/login'; 
import Formulario from './components/Formulario/formulario';

// Importar pages
import Home from './pages/home/home';
import Biblioteca_personal from './pages/biblioteca_personal/biblioteca_personal';
import Buscar_libros from './pages/bucar_libros/buscar_libros';

// Importar ProtectedRoute
import ProtectedRoute from './components/ProtectedRoute';

// Importar AuthProvider
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to="/login" />} />

          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/formulario" element={<Formulario />} />

          {/* Rutas protegidas */}
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/biblioteca_personal" element={<ProtectedRoute element={<Biblioteca_personal />} />} />
          <Route path="/buscar_libros" element={<ProtectedRoute element={<Buscar_libros />} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
