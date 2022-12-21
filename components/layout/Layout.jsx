import React, { useState } from 'react';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast'
import Header from './Header';
import Footer from './Footer';



const Layout = ({ children, title }) => {


    return (
        <>
            <Head>
                <title>{title || 'Animed News'}</title>

                <meta name='author' content='Yohan Daniel Garcia' />
                <meta name='descrioption' content={`Informacion sobre animed y noticias ${title}`} />
                <meta name='keywords' content={`${title}, animed, animed news, notiacia de animed, animed noticia`} />


            </Head>
            <div id='wrapper'>

                <Header />

                <section className='section'>
                    <div className="container px-4">
                        <div className="row gx-5">
                            {children}
                        </div>
                    </div>
                </section>
                <Footer />
                <Toaster />
            </div>

        </>
    );
}

export default Layout;
