import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss, faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';
import { useRouter } from "next/router";
import { formatDistance } from 'date-fns';
import ReactPlayer from 'react-player'

import UseNoticias from '../../hooks/useNoticias';
import TrailersWidgets from './TrailersWidgets';

const Widgets = () => {
    const router = useRouter();
    const { noticias } = UseNoticias('votos')
    const [LinkRuta, setLinkRuta] = useState('')

    // if (router.route === '/noticia/[id]') (
    //      setLinkRuta('/')
    // );
    // else if (router.route === '/') (
    //   setLinkRuta('sa')  
    // )
    return (
        <>
            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 ">
                <div className="sidebar">
                    {/* <div className="widget">
                            <div className="banner-spot clearfix">
                                <div className="banner-img">
                                    <img src="https://images6.fanpop.com/image/photos/42900000/-Luffy-Gear-Fourth-Snake-Man-One-Piece-anime-42987240-300-600.jpg" alt="" className="img-fluid" />
                                </div>
                            </div>
                        </div> */}
                    {/* trailers */}

                    {/* <TrailersWidgets /> */}
                    <div className="widget">
                        <h2 className="widget-title">Populares News{" "}
                            <FontAwesomeIcon icon={faRss} style={{ color: "#FF6347", fontSize: 20, marginLeft: 10 }} />

                        </h2>
                        <div className="blog-list-widget">
                            <div className="list-group">
                                {noticias?.map((noticia, i) => (
                                    <Link key={i} href={"/noticia/[id]"} as={`noticia/${noticia.id}`} className="w-100 p-2 list-group-item list-group-item-action flex-column align-items-start blog-box">
                                        <div className="d-flex justify-content-between ">
                                            <img src={noticia.urlimagen} alt="" className="w-100 img-fluid rounded-start" />
                                            <h5 className="mb-1">{noticia.titulo?.slice(0, 50)}...</h5>
                                        </div>
                                        <small className='fs-6 '>Hace {formatDistance(noticia.creado, new Date())}</small>

                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* <div className="widget">
                        <h2 className="widget-title">Recent Reviews</h2>
                        <div className="blog-list-widget">
                            <div className="list-group">
                                <Link href="tech-single.html" className="list-group-item list-group-item-action flex-column align-items-start">
                                    <div className="w-100 justify-content-between">
                                        <img src="upload/tech_blog_02.jpg" alt="" className="img-fluid float-left" />
                                        <h5 className="mb-1">Banana-chip chocolate cake recipe..</h5>
                                        <span className="rating">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </span>
                                    </div>
                                </Link>

                                <Link href="tech-single.html" className="list-group-item list-group-item-action flex-column align-items-start">
                                    <div className="w-100 justify-content-between">
                                        <img src="upload/tech_blog_03.jpg" alt="" className="img-fluid float-left" />
                                        <h5 className="mb-1">10 practical ways to choose organic..</h5>
                                        <span className="rating">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </span>
                                    </div>
                                </Link>

                                <Link href="tech-single.html" className="list-group-item list-group-item-action flex-column align-items-start">
                                    <div className="w-100 last-item justify-content-between">
                                        <img src="upload/tech_blog_07.jpg" alt="" className="img-fluid float-left" />
                                        <h5 className="mb-1">We are making homemade ravioli..</h5>
                                        <span className="rating">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div> */}

                    {/* <div className="widget">
                        <h2 className="widget-title">Follow Us</h2>

                        <div className="row text-center">
                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                <Link href="#" className="social-button facebook-button">
                                    <i className="fa fa-facebook"></i>
                                    <p>27k</p>
                                </Link>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                <Link href="#" className="social-button twitter-button">
                                    <i className="fa fa-twitter"></i>
                                    <p>98k</p>
                                </Link>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                <Link href="#" className="social-button google-button">
                                    <i className="fa fa-google-plus"></i>
                                    <p>17k</p>
                                </Link>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                <Link href="#" className="social-button youtube-button">
                                    <i className="fa fa-youtube"></i>
                                    <p>22k</p>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="widget">
                        <div className="banner-spot clearfix">
                            <div className="banner-img">
                                <img src="upload/banner_03.jpg" alt="" className="img-fluid" />
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default Widgets;
