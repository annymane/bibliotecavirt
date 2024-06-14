// PARA IMPORTAR LOS ARCHIVOS DE MIS RUTAS
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';


// Importar componentes
import Login from './components/Login/login'; 
import Formulario from './components/Formulario/formulario';


// Importar pages
import Home from './pages/home/home';
import Biblioteca_personal from './pages/biblioteca_personal/biblioteca_personal';
import Buscar_libros from './pages/bucar_libros/buscar_libros';



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
          <Route path='/formulario' element={<Formulario />} />
          <Route path='/home' element={<Home />} /> 
          <Route path='/biblioteca_personal' element={<Biblioteca_personal />} />
          <Route path='/buscar_libros' element={<Buscar_libros />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
