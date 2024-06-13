// PARA IMPORTAR LOS ARCHIVOS DE MIS RUTAS
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// Importar pages
import Home from './pages/home/home';

// Importar componentes
import Login from './components/Login/login'; 
import Formulario from './components/Formulario/formulario';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Ruta por defecto */}
          <Route path='*' element={<Navigate to="/login" />} /> 
          
          {/* ACÁ SON TODAS LAS RUTAS YES YES */}
          {/* Cambiar path y element e importar recordate we >:v*/}
          <Route path='/login' element={<Login />} /> 
          <Route path='/home' element={<Home />} /> 
          <Route path='/formulario' element={<Formulario />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
