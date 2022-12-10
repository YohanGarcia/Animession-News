import React, { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CircumIcon from "@klarr-agency/circum-icons-react"

import { FirebaseContext } from '../../firebase';
import Buscar from '../ui/Buscar';
import { HeaderComponent, Nav, BgDiv, Logout, Botton } from '../ui';
import BurgueButton from './BurgueButton';



const Header = () => {
    const { usuario, firebase } = useContext(FirebaseContext)


    const [clicked, setClicked] = useState(false)

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
                            width={200}
                            height={80}
                            layout='responsive'
                            priority={false}
                            className='nav__logo'
                        />
                    </Link>
                </div>
                <Buscar />

                <div className={`nav__links ${clicked ? 'active' : ' '}`}>
                    <Link onClick={handleLink} href='/' className='nav__link'>Inicio</Link>
                    <Link onClick={handleLink} href='/populares' className='nav__link'>Populares</Link>
                    {usuario?.uid === "pitLCi5WOegqkzxoHY3olbSxkOE3" && (
                        <>
                            <Link onClick={handleLink} href='/nueva-noticia' className=''>Nueva Noticia</Link>
                        </>
                    )}
                    {usuario ? (
                        <>
                            <div className='user'>
                                <img
                                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png"
                                    alt=""
                                    className='user__avatar'
                                />

                                <p className=''>Hola: {usuario?.displayName} </p>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}

                    <div className='admin'>
                        {usuario ? (
                            <>
                                <Botton
                                    onClick={() => firebase.cerrarSession()}
                                >
                                    Cloce
                                </Botton>
                            </>
                        ) : (
                            <>
                                <Link href='/login' className=''>
                                    <Botton className='log'>
                                        Login
                                    </Botton>
                                </Link>

                                <Link href='/crear-cuenta' className=''>

                                    <Botton className='reg'>
                                        sing up
                                    </Botton>
                                </Link>
                            </>
                        )}
                    </div>
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
