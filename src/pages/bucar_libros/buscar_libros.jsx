import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './buscar_libros.module.css'; // Importa estilos usando CSS Modules

export default function BuscarLibros() {
    const [libros, setLibros] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [librosPerPage] = useState(50);
    const [errorMensaje, setErrorMensaje] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        cargarLibros();
    }, []);

    const cargarLibros = () => {
        axios.get('http://localhost:5000/api/libros')
            .then(response => {
                setLibros(response.data);
            })
            .catch(error => {
                console.error('Error al cargar libros:', error);
            });
    };

    // Filtrado de libros
    const librosFiltrados = libros.filter(libro => 
        libro.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        libro.autor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Paginación
    const indexOfLastLibro = currentPage * librosPerPage;
    const indexOfFirstLibro = indexOfLastLibro - librosPerPage;
    const librosActuales = librosFiltrados.slice(indexOfFirstLibro, indexOfLastLibro);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const agregarLibro = (libroId) => {
        console.log(`Agregando libro con ID ${libroId} a la biblioteca personal`);
        axios.post('http://localhost:5000/api/biblioteca_personal', {
            usuario_id: 1, // Reemplaza por el ID real del usuario
            libro_id: libroId
        })
        .then(response => {
            console.log(response.data.mensaje);
            setErrorMensaje('Libro agregado a la biblioteca personal');
            setTimeout(() => {
                setErrorMensaje('');
            }, 2500); // Desaparece el mensaje después de 2 segundos
        })
        .catch(error => {
            if (error.response && error.response.status === 409) {
                console.error('El libro ya se añadió anteriormente');
                setErrorMensaje('El libro ya se añadió anteriormente');
                setTimeout(() => {
                    setErrorMensaje('');
                }, 2000); // Desaparece el mensaje después de 2 segundos
            } else {
                console.error('Error al agregar libro a la biblioteca personal:', error);
                setErrorMensaje('Error al agregar libro a la biblioteca personal');
                setTimeout(() => {
                    setErrorMensaje('');
                }, 2000); // Desaparece el mensaje después de 2 segundos
            }
        });
    };

    return (
        <div className={styles.container}>
            <h2>Lista de Libros</h2>
            <div className={styles.searchContainer}>
                <input 
                    type="text"
                    placeholder="Buscar por título o autor"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <button onClick={() => navigate('/home')} className={styles.button}>
                    Regresar
                </button>
            </div>
            {errorMensaje && <div className={`${styles.alert} ${styles['alert-danger']}`}>{errorMensaje}</div>}
            <div className={styles['table-responsive']}>
                <table className={`${styles.table} ${styles['table-hover']} ${styles['table-striped']}`}>
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
                        {librosActuales.map(libro => (
                            <tr key={libro.id}>
                                <td>{libro.titulo}</td>
                                <td>{libro.autor}</td>
                                <td>{libro.editorial}</td>
                                <td>{libro.fecha_publicacion}</td>
                                <td>{libro.numero_paginas}</td>
                                <td>{libro.genero}</td>
                                <td>{libro.idioma}</td>
                                <td>
                                    <button className={styles.button} onClick={() => agregarLibro(libro.id)}>
                                        Agregar a Biblioteca
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ul className={styles.pagination}>
                {Array.from({ length: Math.ceil(librosFiltrados.length / librosPerPage) }).map((_, index) => (
                    <li key={index + 1} className={`${styles['pagination-item']} ${index + 1 === currentPage ? styles.active : ''}`} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </li>
                ))}
            </ul>
        </div>
    );
}
