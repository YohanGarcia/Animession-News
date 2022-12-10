import React from 'react';
import {
    AsideArticle,
    AsideH3,
    AsideP
} from '../ui';
const News = ({ noticia }) => {
    const { id, posts1, titulo, urlimagen, votos, creado, comentarios } = noticia
    return (
        <>
            
            <AsideArticle>
                <AsideH3>{titulo}</AsideH3>
                <AsideP>{posts1?.slice(0,100)}...</AsideP>
            </AsideArticle>
        </>
    );
}

export default News;
