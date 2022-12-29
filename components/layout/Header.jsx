import React, { useContext, useState } from 'react';
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
import { HeaderComponent, Nav, BgDiv, Logout, Botton } from '../ui';
import BurgueButton from './BurgueButton';
import Dropdown from '../ui/Dropdown';



const Header = () => {
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
        <HeaderComponent className='wrapper'>
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

                <div className={`nav__links ${clicked ? 'active' : ' '}`}>
                    <Link onClick={handleLink} href='/' className='nav__link'>Inicio</Link>
                    <Link onClick={handleLink} href='/populares' className='nav__link'>Populares</Link>

                    {usuario?.uid === "Vm2RAm2MUjMCeNA7Zb47883GkOM2" && (

                        <Link onClick={handleLink} href='/admin' className=''>Admin</Link>
                    )}
                    {usuario?.uid === "YqzdUuBuFBflRsR1C6uVYTXvsu53" && (

                        <Link onClick={handleLink} href='/admin' className=''>Admin</Link>
                    )}
                    <Buscar />

                    {usuario ? (
                        <>
                            <div className='user'>
                                <img
                                    src={usuario.photoURL}
                                    alt=""
                                    className='user__avatar '
                                />

                            </div>

                            <p className='username'>
                                {usuario?.displayName} {' '}

                            </p>
                            <Link href="#!">
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
                        <div className='admin '>
                            <Link href='/login' className='ms-5 p-2 '>
                                <FontAwesomeIcon
                                    icon={faRightToBracket}
                                    style={{
                                        color: "#FF6347",
                                        fontSize: 25,

                                    }}

                                />
                            </Link>

                            {/* <Link href='/crear-cuenta' className=''>
                                <Botton>
                                    <FontAwesomeIcon
                                        icon={faRightFromBracket}
                                        style={{
                                            color: "A4A1A0",
                                            fontSize: 25,

                                        }}
                                    />
                                </Botton>
                            </Link> */}
                        </div>
                    )}

                </div>

                <div className='burguer'>
                    <BurgueButton clicked={clicked} handleClick={handleClick} />
                </div>
                <BgDiv className={`initial ${clicked ? 'active' : ''}`}></BgDiv>
            </Nav>
        </HeaderComponent>

    );
}

export default Header;
