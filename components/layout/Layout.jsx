import React, {useState} from 'react';
import Head from 'next/head';
import Header from './Header';
import { Main } from '../ui/Main';
import Document from 'next/document';



const Layout = ({ children, title }) => {

    
    return (
        <>
            <Head>
                <title>{title || 'Animed News'}</title>

                <meta name='author' content='Yohan Daniel Garcia' />
                <meta name='descrioption' content={`Informacion sobre animed y noticias ${title}`} />
                <meta name='keywords' content={`${title}, animed, animed news, notiacia de animed, animed noticia`} />


            </Head>

            <Header />

            <Main  className='wrapper'>
                {children}
            </Main>
        </>
    );
}

export default Layout;
