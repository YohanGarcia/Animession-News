import Link from "next/link";
import { useState } from "react";
import Router from "next/router";

import Layout from "../components/layout/Layout";
import firebase from "../firebase";

// validaciones
import useValidacion from "../hooks/useValidacion";
import validarCrearCuenta from "../validacion/validarCrearCuenta";


const STATE_INICIAL = {
  nombre: '',
  email: '',
  password: '',
  rol: ''
}
export default function CrearCuenta() {

  const [error, guardarErrore] = useState('');

  const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);
  const { nombre, email, password } = valores;

  async function crearCuenta() {
    try {
      await firebase.registrar(nombre, email, password);
      Router.push('/')
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        guardarErrore('El email esta ciendo usado por otro usuario');
      }
    }
  }

  return (
    <div>
      <Layout>
        <section className=" bg-image form-fondo">
          <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                  <div className="card">
                    <div className="card-body p-5">
                      <h2 className="text-uppercase text-center mb-5">Crear Cuenta</h2>
                      {error && <p className="text-danger">{error}</p>}
                      <form onSubmit={handleSubmit} noValidate>

                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form3Example1cg">Nombre</label>
                          <input
                            type="text"
                            name="nombre"
                            id="form3Example1cg"
                            className="form-control form-control-lg"
                            value={nombre}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errores.nombre && <p className="text-danger">{errores.nombre}</p>}
                        </div>

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
                            className="btn btn-light btn-sm border border-1 border-info rounded-4">Crear Cuenta</button>
                        </div>

                        <p className="text-center text-muted mt-5 mb-0">¿Ya tienes una cuenta? <Link href="/login"
                          className="fw-bold text-body"><u>Entre aquí</u></Link></p>

                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
}
