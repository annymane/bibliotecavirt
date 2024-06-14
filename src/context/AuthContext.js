// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Inicialmente, el usuario no está autenticado

  const login = (userData) => {
    setUser(userData); // Establecer los datos del usuario al autenticarse
  };

  const logout = () => {
    setUser(null); // Eliminar los datos del usuario al cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
