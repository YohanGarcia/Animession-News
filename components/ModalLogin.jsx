import React, { useState, useContext } from 'react';
import Link from "next/link";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import myFirebase, { FirebaseContext } from '../firebase';

// validaciones
import useValidacion from "../hooks/useValidacion";
import validarIniciarSession from "../validacion/validarIniciarSession";

const STATE_INICIAL = {
    email: '',
    password: ''
}

const ModalLogin = ({ show, handleClose }) => {
    const { usuario } = useContext(FirebaseContext);

    function usuarioRdirected() {
        show = true;
    }

    const [error, guardarErrore] = useState('');

    const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(STATE_INICIAL, validarIniciarSession, IniciarSession);
    const { email, password } = valores;

    async function IniciarSession() {
        try {
            await myFirebase.login(email, password);
            Router.push('/');
        } catch (error) {
            console.error('Hubo un error al autenticarse el usuario', error.code);
            if (error.code === 'auth/user-not-found') {
                guardarErrore('El E-mail no existe');
            } else if (error.code === 'auth/wrong-password') {
                guardarErrore('Contraseña incorrecta');
            }
        }
    }
    return (
        <>
            {usuario ? usuarioRdirected() :
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Iniciar Session</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <>
                            {error && <p className="text-danger">{error}</p>}
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3cg">E-mail</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="form3Example3cg"
                                        className="form-control form-control-lg"
                                        value={email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errores.email && <p className="text-danger">{errores.email}</p>}
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example4cg">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="form3Example4cg"
                                        className="form-control form-control-lg"
                                        value={password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errores.password && <p className="text-danger">{errores.password}</p>}
                                </div>
                                <div className="d-flex justify-content-center">
                                    <Button
                                        type="submit"
                                        className="btn btn-light btn-sm border border-1 border-info rounded-4">
                                        Iniciar Session
                                    </Button>
                                </div>
                                <p className="text-center text-muted mt-5 mb-0">¿No tienes una cuenta? <Link href="/crear-cuenta"
                                    className="fw-bold text-body"><u>Entre aquí</u></Link>
                                </p>
                            </form>
                        </>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
        </>

    );
}

export default ModalLogin;
