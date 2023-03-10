import React, { useContext, useState } from 'react';
import { Modal, Button } from 'react-bootstrap'
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faRightToBracket,
    faCircleArrowDown,
    faRightFromBracket,
    faXmark
} from '@fortawesome/free-solid-svg-icons'

import { FirebaseContext } from '../../firebase';
import Buscar from '../ui/Buscar';
import { Nav, BgDiv, Logout, Botton } from '../ui';
import BurgueButton from './BurgueButton';
import Dropdown from '../ui/Dropdown';
import ModalLogin from '../ModalLogin';


const Header = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { usuario, firebase } = useContext(FirebaseContext)
    const [clicked, setClicked] = useState(false)

    const handleMenuOne = () => {
        firebase.cerrarSession()
    };

    const handleMenuTwo = () => {
        console.log('clicked two');
    };

    const handleClick = () => {
        setClicked(!clicked)
    }
    const handleLink = () => {
        setClicked(false)
    }

    return (
        <div className="container-fluid">
            <div className={`wrapper navbar-inverse bg-inverse ${clicked ? '' : 'fixed-top'}`}>
                <Nav>
                    <div className='contenedor__logo'>
                        <Link href='/'>
                            <Image
                                src='/logo.png'
                                alt='animession news'
                                width='200'
                                height='80'
                                layout='responsive'
                                priority={false}
                                className='nav__logo'
                            />
                        </Link>
                    </div>

                    <div className={`nav__links  ${clicked ? 'active' : ' '}`}>
                        <Buscar />

                        <Link onClick={handleLink} href='/' className='nav__link'>Inicio</Link>
                        <Link onClick={handleLink} href='/noticias' className='nav__link'>News</Link>
                        <Link onClick={handleLink} href='/estreno' className='nav__link'>Estreno 2023</Link>


                        {usuario?.uid === "Vm2RAm2MUjMCeNA7Zb47883GkOM2" && (

                            <Link onClick={handleLink} href='/admin' className='nav__link'>Admin</Link>
                        )}
                        {usuario?.uid === "YqzdUuBuFBflRsR1C6uVYTXvsu53" && (

                            <Link onClick={handleLink} href='/admin' className='nav__link'>Admin</Link>
                        )}

                        {usuario ? (
                            <>
                                <img
                                    src={usuario.photoURL}
                                    alt=""
                                    className='user__avatar  '
                                />

                                <p className='fs-5 d-flex pt-1 '>
                                    {usuario?.displayName} {' '}

                                </p>
                                <Link href="#!" className=''>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        onClick={handleMenuOne}
                                        style={{
                                            color: "#FF6347",
                                            fontSize: 30,
                                        }}
                                    />
                                </Link>
                            </>
                        ) : (

                            <Link href='#' className='pb-2 ' onClick={handleShow}>
                                <FontAwesomeIcon
                                    icon={faRightToBracket}
                                    style={{
                                        color: "#FF6347",
                                        fontSize: 25,

                                    }}

                                />
                            </Link>

                        )}

                    </div>

                    <div className='burguer'>
                        <BurgueButton clicked={clicked} handleClick={handleClick} />
                    </div>
                    <BgDiv className={`initial ${clicked ? 'active' : ''}`}></BgDiv>
                </Nav>
                <ModalLogin show={show} handleClose={handleClose} />
            </div>
        </div>

    );
}

export default Header;
