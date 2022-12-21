import React from "react";
import Layout from "../components/layout/Layout";
import DetallesNoticia from "../components/layout/DetallesNoticia"
import UseNoticias from "../hooks/useNoticias";
import ListsNews from "../components/layout/ListsNews";
import Link from "next/link";

export default function Pospulare() {

    const { noticias } = UseNoticias('votos')

    return (
        <div>
            <Layout>
                <div className='col-lg-8 col-md-12 col-sm-12 col-xs-12'>
                    <div className='page-wrapper'>
                        
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
            </Layout>
        </div>
    );
}
