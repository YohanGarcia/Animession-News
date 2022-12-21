import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss } from '@fortawesome/free-solid-svg-icons'
import UseNoticias from '../../hooks/useNoticias';

import ListsNews from './ListsNews';
import Widgets from './Widgets';

const TopNoticia = () => {

    const { noticias } = UseNoticias('creado')
    // const [voto, setVoto] = useState({})
    // useEffect(() => {
    //     if (noticias.length > 0) {
    //         setVoto(noticias[0])
    //     }
    // }, [noticias])

    return (
        <>

            <div className='col-lg-8 col-md-12 col-sm-12 col-xs-12'>
                <div className='page-wrapper'>
                    <div className='blog-top clearfix'>
                        <h4 className="pull-left">
                            Recent News
                            <FontAwesomeIcon icon={faRss} style={{ color: "#FF6347", fontSize: 20, marginLeft: 10 }} />

                        </h4>
                    </div>
                    <div className="blog-list clearfix">
                        {noticias.slice(0, 3).map((noticia, index) => (
                            <ListsNews key={index} noticia={noticia} />
                        ))}
                    </div>
                </div>
                <hr className="invis" />
                <div className="row">
                    <div className="col-md-12">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                                <li className="page-item"><Link className="page-link " href="#">1</Link></li>
                                <li className="page-item"><Link className="page-link" href="#">2</Link></li>
                                <li className="page-item"><Link className="page-link" href="#">3</Link></li>
                                <li className="page-item">
                                    <Link className="page-link" href="#">Next</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            
            <Widgets noticia={noticias}/>
           

        </>
    );
}

export default TopNoticia;
