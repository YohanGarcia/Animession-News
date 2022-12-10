import Link from 'next/link';
import React from 'react';
import { PostsMedia,
    Col4,
    Col8
 } from '../ui';

const ListsNews = ({ noticia }) => {
    const { id, posts1, titulo, urlimagen, votos, creado, comentarios } = noticia
    return (
        <div className='blog-box'>
            <Col4>
                <PostsMedia>
                    <Link href='#' >
                        <img src={urlimagen} alt="" />
                        <div className="hovereffect"></div>
                    </Link>
                </PostsMedia>
            </Col4>
            <Col8 className="blog-meta big-meta">
                <h4><Link href="#" title="">{titulo}</Link></h4>
                <p>Aenean interdum arcu blandit, vehicula magna non, placerat elit. Mauris et pharetratortor. Suspendissea sodales urna. In at augue elit. Vivamus enim nibh, maximus ac felis nec, maximus tempor odio.</p>
                <small className="firstsmall"><Link className="bg-orange" href="#" title="">Gadgets</Link></small>
                <small><Link href="#" title="">21 July, 2017</Link></small>
                <small><Link href="#" title="">by Matilda</Link></small>
                <small><Link href="#" title=""><i className="fa fa-eye"></i> 1114</Link></small>
            </Col8>
        </div>
    );
}

export default ListsNews;
