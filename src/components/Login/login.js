import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          contraseña: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Login exitoso', data);
        // Asegúrate de que data.id sea el ID del usuario que el servidor devuelve
        login({ email, id: data.usuario.id });
        navigate('/home');
      } else {
        console.error('Error en el login', data);
        setError(data.mensaje || 'Error desconocido');
      }
    } catch (error) {
      console.error('Error al conectar con el servidor', error);
      setError('Error de conexión');
    }
  };

  return (
    <div className={styles.box}>
      <form onSubmit={handleLogin}>
        <div className={styles.title}>
          <h1> -- Portal al Saber -- </h1>
        </div>
        <div className={styles['input-box']}>
          <label htmlFor="email" className={styles['label-color']}>Correo</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Ingresa un correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <label htmlFor="password" className={styles['label-color']}>Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Ingrese una contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <input type="submit" className={styles.Login} value="Ingresar" />
          <br />
          {error && <p className={styles['error-message']}>{error}</p>}
          <p className={styles['link-text']}>
            ¿No tienes una cuenta? <a href="/formulario">Presiona aquí</a>
          </p>
        </div>
      </form>
    </div>
  );
}
