import React, { useState, useEffect, Suspense, lazy } from "react";
import Layout from "../components/layout/Layout";
import Populares from "../components/tabs/Populares";
import Recientes from "../components/tabs/Recientes";
import Todas from "../components/tabs/Todas";
import { Spiner } from "../components/ui/spiner";
import { GridLoader } from "react-spinners"
export default function Pospulare() {

    const [loanding, setLoanding] = useState(true)


    const [todos, setTodos] = useState(true)
    const [recientes, setRecientes] = useState(false)
    const [populares, setPopulares] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setLoanding(false);
        })
    }, [3000]);

    function clickTodas() {
        setTodos(true);
        setPopulares(false);
        setRecientes(false);
    }

    function clickPopulares() {
        setPopulares(true)
        setRecientes(false)
        setTodos(false)
    }
    function clickRecientes() {
        setRecientes(true)
        setPopulares(false)
        setTodos(false)
    }

    
    return (
        <div>
            <Layout>

                <div className='col-lg-8 col-md-12 col-sm-12 col-xs-12'>
                    <ul className="nav  nav-fill fs-4 fw-bold">
                        <li className="nav-item">
                            <button
                                className={`myTabs ${todos ? 'myActive' : ''}`}
                                onClick={clickTodas}
                            >Todas</button>
                        </li>
                        <li className="nav-item">

                            <button
                                className={`myTabs ${recientes ? 'myActive' : ''}`}
                                onClick={clickRecientes}
                            >Recientes</button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`myTabs ${populares ? 'myActive' : ''}`}
                                onClick={clickPopulares}
                            >Populares</button>
                        </li>
                        <li className="nav-item">
                            {/* <button class={`nav-link ${todos ? 'active' : ''}`}>Estrenos 2023</button> */}
                        </li>
                    </ul>
                    <Suspense fallback={<Spiner><GridLoader color="#FF6347" /></Spiner> }>
                        {todos ? <Todas /> : null}


                        {populares ? <Populares /> : null}

                        {recientes ? <Recientes /> : null}
                    </Suspense>
                </div>
            </Layout>
        </div>
    );
}
