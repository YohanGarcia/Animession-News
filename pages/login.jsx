import Link from "next/link";
import { useState, useContext } from "react";
import Router from "next/router";

import Layout from "../components/layout/Layout";
import myFirebase, { FirebaseContext } from "../firebase";

// validaciones
import useValidacion from "../hooks/useValidacion";
import validarIniciarSession from "../validacion/validarIniciarSession";



const STATE_INICIAL = {
    email: '',
    password: ''
}

const Login = () => {

    const { usuario } = useContext(FirebaseContext);

    function usuarioRdirected() {
        Router.push("/");

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
        <div>
            <Layout>
                {usuario ? usuarioRdirected() :
                    <>
                        <section className=" bg-image form-fondo">
                            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                                <div className="container h-100">
                                    <div className="row d-flex justify-content-center align-items-center h-100">
                                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                            <div className="card">
                                                <div className="card-body p-5">
                                                    <h2 className="text-uppercase text-center mb-5">Iniciar Session</h2>
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
                                                            <button type="submit"
                                                                className="btn btn-light btn-sm border border-1 border-info rounded-4">Iniciar Session</button>
                                                        </div>

                                                        <p className="text-center text-muted mt-5 mb-0">¿No tienes una cuenta? <Link href="/crear-cuenta"
                                                            className="fw-bold text-body"><u>Entre aquí</u></Link></p>

                                                    </form>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                }
            </Layout>
        </div>

    );
}

export default Login;
