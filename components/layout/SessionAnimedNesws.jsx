import { formatDistance } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import {
    Article,
    ArticleTexts,
    ArticleFecha,
    ArticleTitulo,
    ArticleDescricion
} from '../ui';



const SessionAnimedNesws = ({ noticia }) => {
    const { id, posts1, titulo, urlimagen, votos, creado, comentarios } = noticia

    return (
        <>
            <Link href="/noticia/[id]" as={`noticia/${id}`}>
                <Article>
                    <img src={urlimagen} alt={titulo} className="article__img" />
                    <ArticleTexts>
                        <ArticleFecha>Hace {formatDistance(creado, new Date())}</ArticleFecha>
                        <ArticleTitulo>{titulo?.slice(0, 50)}</ArticleTitulo>
                        <ArticleDescricion>{posts1?.slice(0, 100)}...</ArticleDescricion>
                    </ArticleTexts>
                </Article>
            </Link>
        </>
    );
}

export default SessionAnimedNesws;
