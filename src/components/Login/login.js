import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const response = await fetch('http://127.0.0.1:5000/api/usuarios/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        contraseña: password,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Login exitoso', data);
      // Redirigir al usuario al componente Home
      navigate('/home');
    } else {
      console.error('Error en el login', data);
      setError(data.mensaje || 'Error desconocido');
    }
  };

  return (
    <div>
      <div className="box">
        <form onSubmit={handleLogin}>
          <div className="title">
            <h1>Login Form</h1>
          </div>
          <div className="input-box">
            <label htmlFor="email" className="label-color">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <label htmlFor="password" className="label-color">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <input type="submit" className="Login" value="Login" />
            <br />
            {error && <p className="error-message">{error}</p>}
            <p className="link-text">Forget password? <a href="#">Click Here</a></p>
            <p className="link-text">
              Don't have an account? <a href="/formulario">Click Here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
