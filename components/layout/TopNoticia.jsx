import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import UseNoticias from '../../hooks/useNoticias';
import {
    Hero,
    ImgTop,
    TextTop,
    TitleTop,
    PostsTop,
    Aside,
    AsideH2,
    Botton,
    BlogTop
} from '../ui';
import News from './News';
import Image from 'next/image';
import ListsNews from './ListsNews';

const TopNoticia = () => {

    const { noticias } = UseNoticias('votos')
    const [voto, setVoto] = useState({})
    useEffect(() => {
        if (noticias.length > 0) {
            setVoto(noticias[0])
        }
    }, [noticias])

    return (
        <>
            <Hero>
                <BlogTop>
                    <h4 className="pull-left">Recent News <a href="#"><i className="fa fa-rss"></i></a></h4>
                </BlogTop>
                {noticias.slice(0, 3).map((noticia, index) => (
                    <ListsNews key={index} noticia={noticia} />
                ))}











                {/* <ImgTop background={voto.urlimagen} className='hero__img'></ImgTop>
                <TextTop>
                    <TitleTop>{voto.titulo?.slice(0, 100)}...</TitleTop>
                    <div className="hero__copy">
                        <PostsTop>
                            {voto.posts1?.slice(0, 200)}...
                        </PostsTop>
                        <Link href='#' className="hero__cta">Read more</Link>
                    </div>
                </TextTop> */}
            </Hero>
            <Aside>
                <AsideH2>News</AsideH2>
                {noticias.slice(0, 3).map((noticia, index) => (
                    <News key={index} noticia={noticia} />
                ))}
            </Aside>
        </>
    );
}

export default TopNoticia;
