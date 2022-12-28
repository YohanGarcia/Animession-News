import Link from 'next/link';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatDistance } from 'date-fns';

import { faHeart } from '@fortawesome/free-solid-svg-icons'

const ListsNews = ({ noticia }) => {
    const { id, posts1, titulo, urlimagen, votos, creado, categoria } = noticia
    return (
        <><div className="blog-box row">
            <div className="col-md-4">
                <div className="post-media">
                    <Link href="/noticia/[id]" as={`noticia/${id}`} title="">
                        <img src={urlimagen} alt="" className="img-fluid" />
                        <div className="hovereffect"></div>
                    </Link>
                </div>
            </div>

            <div className="blog-meta big-meta col-md-8">
                <h4><Link href="/noticia/[id]" as={`noticia/${id}`} title="">{titulo}</Link></h4>
                <p>{posts1?.slice(0, 200)}...</p>
                <small className="fs-6"><Link className="bg-orange" href="/noticia/[id]" as={`noticia/${id}`} title="">{categoria.nombre}</Link></small>
                <small className='fs-6'>Hace {formatDistance(creado, new Date())}</small>
                <small className='fs-6'>
                    <FontAwesomeIcon icon={faHeart} style={{ color: "red", fontSize: 16 }} />
                    {" "}{votos}
                </small>
            </div>
        </div><hr className='invis' /></>

    );
}

export default ListsNews;
