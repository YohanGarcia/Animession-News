import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss } from '@fortawesome/free-solid-svg-icons'
import Widgets from '../components/layout/Widgets';
import Layout from '../components/layout/Layout';
import Estrenos from '../components/tabs/estreno';
import Primavera from '../components/tabs/Primavera';
import Verano from '../components/tabs/Verano';
import Otono from '../components/tabs/Otono';
import Invierno from '../components/tabs/Invierno';


const Estreno = () => {

    const [todos, setTodos] = useState(true)
    const [primavera, setPrimavera] = useState(false)
    const [verano, setVerano] = useState(false)
    const [otono, setOtono] = useState(false)
    const [invierno, setInvierno] = useState(false)

    function clickTodas() {
        setTodos(true);
        setPrimavera(false);
        setVerano(false);
        setOtono(false)
        setInvierno(false)
    }
    function clickPrimavera() {
        setPrimavera(true)
        setVerano(false)
        setTodos(false)
        setOtono(false)
        setInvierno(false)
    }
    function clickVerano() {
        setVerano(true)
        setPrimavera(false)
        setTodos(false)
        setOtono(false)
        setInvierno(false)
    }
    function clickOtono() {
        setOtono(true)
        setVerano(false)
        setPrimavera(false)
        setTodos(false)
        setInvierno(false)
    }
    function clickInvierno() {
        setInvierno(true)
        setOtono(false)
        setVerano(false)
        setPrimavera(false)
        setTodos(false)
    }

    return (
        <Layout>
            <div className='col-lg-8 col-md-12 col-sm-12 col-xs-12'>

                <div className='page-wrapper'>

                    <div className='blog-top clearfix'>
                        <ul className="nav  nav-fill fs-4 fw-bold">
                            <li className="nav-item">
                                <button
                                    className={`myTabs ${todos ? 'myActive' : ''}`}
                                    onClick={clickTodas}
                                >Todas</button>
                            </li>
                            <li className="nav-item">

                                <button
                                    className={`myTabs ${primavera ? 'myActive' : ''}`}
                                    onClick={clickPrimavera}
                                >Primevera</button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`myTabs ${verano ? 'myActive' : ''}`}
                                    onClick={clickVerano}
                                >Verano</button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`myTabs ${otono ? 'myActive' : ''}`}
                                    onClick={clickOtono}
                                >Otoño</button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`myTabs ${invierno ? 'myActive' : ''}`}
                                    onClick={clickInvierno}
                                >Invierno</button>
                            </li>
                        </ul>
                    </div>
                    <div className="blog-list clearfix">
                        {todos ? <Estrenos /> : null}
                        {primavera ? <Primavera /> : null}
                        {verano ? <Verano /> : null}
                        {otono ? <Otono /> : null}
                        {invierno ? <Invierno /> : null}
                    </div>
                </div>
                <hr className="invis" />
            </div>
            <Widgets />
        </Layout>
    );
}

export default Estreno;
