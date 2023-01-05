import Link from 'next/link';
import React, { useContext, useState } from 'react';
import Layout from "../../components/layout/Layout";
import { Botton } from '../../components/ui';
import { FirebaseContext } from '../../firebase';
import AuthenticatedRoute from '../../components/AuthenticatedRoute';
import Header from '../../components/layout/Header';

import { GridLoader } from "react-spinners"
import { Spiner } from '../../components/ui/spiner';
import Todas from '../../components/tabs/Todas'
import NuevaNoticia from '../../components/tabs/nueva-noticia';
import Categoria from '../../components/tabs/Categotia';
import SubCategoria from '../../components/tabs/SubCategoria'
const Index = () => {
    const [dashboard , setDashboard ] = useState(true)
    const [noticia, setNoticia] = useState(false)
    const [categoria, setCategoria] = useState(false)
    const [subCategoria, setSubCategoria] = useState(false)
    const [error, setError] = useState(false);

    function clickTodas() {
        setDashboard(true);
        setCategoria(false);
        setNoticia(false);
        setSubCategoria(false)

    }

    function clickPopulares() {
        setCategoria(true)
        setNoticia(false)
        setDashboard(false)
        setSubCategoria(false)

    }
    function clickRecientes() {
        setNoticia(true)
        setCategoria(false)
        setDashboard(false)
        setSubCategoria(false)
    }
    function clickSubCategoria(){
        setSubCategoria(true)
        setCategoria(false)
        setDashboard(false)
        setNoticia(false);
    }
    if (Object.keys(dashboard) === true && !error) return <Spiner><GridLoader color="#FF6347" /></Spiner>;
    return (


        <div className='container-fluid'>
            <div className="row flex-wrap">
                <div className="col-lg-12">
                    <Header />
                </div>
                <div className='col-lg-2 min-vh-100 ' style={{ marginTop: '80px', backgroundColor: '#5694b167'}}>
                    <nav className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white fixed-top'
                    style={{ marginTop: '80px', width: '15%'  }}>
                        <ul className="nav nav-pills  flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start pt-4">
                          
                            <li className="nav-item">
                                <button
                                    className={`myTabs ${dashboard ? 'myActive' : ''}`}
                                    onClick={clickTodas}
                                >Panel Admin</button>
                            </li>
                            <li className="nav-item pt-3">

                                <button
                                    className={`myTabs ${noticia ? 'myActive' : ''}`}
                                    onClick={clickRecientes}
                                >Crear Noticia</button>
                            </li>
                            <li className="nav-item pt-3">
                                <button
                                    className={`myTabs ${categoria ? 'myActive' : ''}`}
                                    onClick={clickPopulares}
                                >Crear Categoria</button>
                            </li>
                            <li className="nav-item pt-3">
                                <button
                                    className={`myTabs ${subCategoria ? 'myActive' : ''}`}
                                    onClick={clickSubCategoria}
                                >Crear Sub-Categoria</button>
                            </li>
                            <li className="nav-item">
                                {/* <button className={`nav-link ${todos ? 'active' : ''}`}>Estrenos 2023</button> */}
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="col-lg-10" style={{ marginTop: '80px', zIndex: '3' }}>
                    {dashboard ? <>Pronto</> : null}
                    {categoria ? <Categoria /> : null} 
                    {noticia ? <NuevaNoticia /> : null}
                    {subCategoria ? <SubCategoria />:null } 
                </div>

            </div>




        </div>

    );
}
Index.Auth = AuthenticatedRoute
export default Index;
