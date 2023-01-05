import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import Populares from "../components/tabs/Populares";
import Recientes from "../components/tabs/Recientes";
import Todas from "../components/tabs/Todas";
export default function Pospulare() {



    const [todos, setTodos] = useState(true)
    const [recientes, setRecientes] = useState(false)
    const [populares, setPopulares] = useState(false)



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
                    </ul>
                        {todos ? <Todas /> : null}


                        {populares ? <Populares /> : null}

                        {recientes ? <Recientes /> : null}
                </div>
            </Layout>
        </div>
    );
}
