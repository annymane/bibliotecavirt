import React, { useState } from 'react';
import styles from './formulario.module.css'; // Importa estilos usando CSS Modules

export default function Formulario() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [showLoginLink, setShowLoginLink] = useState(false); // Estado para mostrar el enlace de login

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setMensaje(null);

    const response = await fetch('http://127.0.0.1:5000/api/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: nombre,
        email: email,
        contraseña: contraseña,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Usuario creado exitosamente', data);
      setMensaje('Usuario creado exitosamente');
      setShowLoginLink(true); // Mostrar el enlace de login después de éxito
    } else {
      console.error('Error al crear usuario', data);
      setError(data.error || 'Error desconocido');
    }
  };

  return (
    <div className={styles.box}>
      <form onSubmit={handleRegister}>
        <div className={styles.title}>
          <h1>Formulario para crear cuenta</h1>
        </div>
        <div className={styles['input-box']}>
          <label htmlFor="nombre" className={styles['label-color']}>Nombre</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className={styles['input-box']}>
          <label htmlFor="email" className={styles['label-color']}>Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles['input-box']}>
          <label htmlFor="contraseña" className={styles['label-color']}>Contraseña</label>
          <input
            id="contraseña"
            name="contraseña"
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>
        <div className={styles['input-box']}>
          <input type="submit" className={styles.Register} value="Registrar" />
        </div>
        {error && <p className={styles['error-message']}>{error}</p>}
        {mensaje && (
          <div className={styles['success-message']}>
            <p>{mensaje}</p>
            {showLoginLink && (
              <p className={styles['link-text']}>
                ¿Deseas <a href="/login">iniciar sesión</a> nuevamente?
              </p>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
