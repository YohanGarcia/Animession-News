import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../../firebase';
import Link from 'next/link';
import Image from 'next/image';
import Buscar from '../ui/Buscar';

const Navegacion = () => {

    const { usuario } = useContext(FirebaseContext)



    // if (usuario?.uid === "pitLCi5WOegqkzxoHY3olbSxkOE3"){
    //     console.log("eres Yohan");
    //     setAdmin(true)
    // }
    return (
        <>
            <div className="nav__links" id="menu">


                <Link href='/' className='nav__link'>Inicio</Link>
                <Link href='/populares' className='nav__link'>Populares</Link>
                {usuario?.uid === "pitLCi5WOegqkzxoHY3olbSxkOE3" && (
                    <>
                        <Link href='/nueva-noticia' className=''>Nueva Noticia</Link>
                    </>
                )}
                <Buscar />


            </div>

        </>
    );
}

export default Navegacion;
