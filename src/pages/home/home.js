// PARA REALIZAR AUTOMATICAMENTE LA ESTRUCTURA RCF

import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link para la navegación interna

import styles from './home.module.css'; // Importa estilos usando CSS Modules

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1> ¡Bienvenido a nuestra Biblioteca Mística de Thalindor!</h1>
        <br></br>
        <h1> </h1>
      </div>
      <div className={styles.buttons}>
        <Link to="/biblioteca_personal" className={styles.button}>
          Gestionar Biblioteca Personal
        </Link>
        <Link to="/buscar_libros" className={styles.button}>
          Buscar Libros
        </Link>
      </div>
    </div>
  );
}
