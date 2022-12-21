import Link from 'next/link';
import React, { useContext, useState } from 'react';
import Layout from "../../components/layout/Layout";
import { Botton } from '../../components/ui';
import { FirebaseContext } from '../../firebase';


const Index = () => {
    const { usuario, firebase } = useContext(FirebaseContext)
    const [clicked, setClicked] = useState(false)




    const handleClick = () => {
        setClicked(!clicked)
    }
    const handleLink = () => {
        setClicked(false)
    }
    return (
        <Layout>

            {usuario?.uid === "Vm2RAm2MUjMCeNA7Zb47883GkOM2" && (
                <>
                    <Link onClick={handleLink} href='/admin/crear-news/nueva-noticia' className='p-5'><Botton> Crear Nueca Noticia </Botton></Link>

                    <Link onClick={handleLink} href='/admin/categoria' className='p-5'><Botton> Crear Nueva Categoria </Botton></Link>

                </>
            )}
            {usuario?.uid === "YqzdUuBuFBflRsR1C6uVYTXvsu53" && (
                <>
                    <Link onClick={handleLink} href='/admin/crear-news/nueva-noticia' className='p-5'><Botton> Crear Nueca Noticia </Botton></Link>
                    

                    <Link onClick={handleLink} href='/admin/categoria' className='p-5'><Botton> Crear Nueva Categoria </Botton></Link>
                </>
            )}
        </Layout>
    );
}

export default Index;
