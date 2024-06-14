import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Pagination, Button, Alert } from 'react-bootstrap'; // Importa Alert de react-bootstrap
// import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './buscar_libros.module.css'; // Importa estilos usando CSS Modules


export default function BuscarLibros() {
    const [libros, setLibros] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [librosPerPage] = useState(50);
    const [errorMensaje, setErrorMensaje] = useState('');

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

    // Paginación
    const indexOfLastLibro = currentPage * librosPerPage;
    const indexOfFirstLibro = indexOfLastLibro - librosPerPage;
    const librosActuales = libros.slice(indexOfFirstLibro, indexOfLastLibro);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const agregarLibro = (libroId) => {
        console.log(`Agregando libro con ID ${libroId} a la biblioteca personal`);
        axios.post('http://localhost:5000/api/biblioteca_personal', {
            usuario_id: 1, // Reemplaza por el ID real del usuario
            libro_id: libroId
        })
        .then(response => {
            console.log(response.data.mensaje);
            // Limpia el mensaje de error si no hay error
            setErrorMensaje('Libro agregado a la biblioteca personal');
            setTimeout(() => {
                setErrorMensaje('');
            }, 2000); // Desaparece el mensaje después de 2 segundos
            // Aquí podrías implementar la lógica adicional si es necesario, como actualizar la interfaz
        })
        .catch(error => {
            if (error.response && error.response.status === 409) {
                console.error('El libro ya se añadió anteriormente');
                // Establece el mensaje de error para mostrar al usuario
                setErrorMensaje('El libro ya se añadió anteriormente');
                setTimeout(() => {
                    setErrorMensaje('');
                }, 2000); // Desaparece el mensaje después de 2 segundos
            } else {
                console.error('Error al agregar libro a la biblioteca personal:', error);
                // Aquí podrías manejar otros errores, como errores de red, etc.
                setErrorMensaje('Error al agregar libro a la biblioteca personal');
                setTimeout(() => {
                    setErrorMensaje('');
                }, 2000); // Desaparece el mensaje después de 2 segundos
            }
        });
    };

    return (
        <div className="container mt-4">
            <h2>Lista de Libros</h2>
            {errorMensaje && <Alert variant="danger">{errorMensaje}</Alert>} {/* Muestra el mensaje de error si está definido */}
            <Table striped bordered hover responsive>
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
                                <Button variant="primary" size="sm" onClick={() => agregarLibro(libro.id)}>
                                    Agregar a Biblioteca
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination>
                {Array.from({ length: Math.ceil(libros.length / librosPerPage) }).map((_, index) => (
                    <Pagination.Item key={index + 1} onClick={() => paginate(index + 1)} active={index + 1 === currentPage}>
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    );
}
