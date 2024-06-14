import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './biblioteca_personal.module.css'; 
import { useAuth } from '../../context/AuthContext'; 

export default function BibliotecaPersonal() {
    const [libros, setLibros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth(); // Obtener el usuario del contexto

    useEffect(() => {
        if (user && user.id) {
            cargarLibros(user.id);
        }
    }, [user]);

    const cargarLibros = (userId) => {
        axios.get(`http://localhost:5000/api/biblioteca_personal/${userId}/libros`)
            .then(response => {
                setLibros(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al cargar libros de la biblioteca personal:', error);
                setError('Error al cargar libros. Inténtalo de nuevo más tarde.');
                setLoading(false);
            });
    };

    const eliminarLibro = (libroId) => {
        axios.delete(`http://localhost:5000/api/biblioteca_personal/${user.id}/libros/${libroId}`)
            .then(response => {
                console.log(response.data.mensaje);
                cargarLibros(user.id);
            })
            .catch(error => {
                console.error('Error al eliminar libro de la biblioteca personal:', error);
            });
    };

    const marcarLibro = (libroId, leido) => {
        axios.post('http://localhost:5000/api/biblioteca_personal/marcar_libro', {
            usuario_id: user.id,
            libro_id: libroId,
            leido: !leido
        })
        .then(response => {
            console.log(response.data.mensaje);
            cargarLibros(user.id);
        })
        .catch(error => {
            console.error('Error al marcar libro como leído/no leído:', error);
        });
    };

    if (loading) {
        return <p>Loading...</p>; // Indicador de carga
    }

    if (error) {
        return <p>{error}</p>; // Mensaje de error
    }

    return (
        <div className={styles.container}>
            <h2>Biblioteca Personal</h2>
            <div className={styles.tableResponsive}>
                <table className={`${styles.table} ${styles.tableHover} ${styles.tableStriped}`}>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Autor(es)</th>
                            <th>Editorial</th>
                            <th>Fecha de publicación</th>
                            <th>Número de páginas</th>
                            <th>Género</th>
                            <th>Idioma</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {libros.map(libro => (
                            <tr key={libro.id}>
                                <td>{libro.titulo}</td>
                                <td>{libro.autor}</td>
                                <td>{libro.editorial}</td>
                                <td>{libro.fecha_publicacion}</td>
                                <td>{libro.numero_paginas}</td>
                                <td>{libro.genero}</td>
                                <td>{libro.idioma}</td>
                                <td className={styles.buttonContainer}>
                                    <button
                                        className={`${styles.button} ${styles.buttonEliminar}`}
                                        onClick={() => eliminarLibro(libro.id)}
                                    >
                                        Eliminar
                                    </button>
                                    <button
                                        className={`${styles.button} ${libro.leido ? styles.buttonLeido : styles.buttonMarcar}`}
                                        onClick={() => marcarLibro(libro.id, libro.leido)}
                                    >
                                        {libro.leido ? 'Leído' : 'No leído'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
