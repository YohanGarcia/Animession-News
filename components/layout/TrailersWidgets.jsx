import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss, faPlayCircle } from '@fortawesome/free-solid-svg-icons'

import UseNoticias from '../../hooks/useNoticias';
import { formatDistance } from 'date-fns';
import ReactPlayer from 'react-player'

const TrailersWidgets = () => {
    const { trailers } = UseNoticias('creado')

    return (
        <div className="widget ">
            <h2 className="widget-title">TRAILERS {" "}
                <FontAwesomeIcon
                    icon={faPlayCircle}
                    style={{
                        color: "red",
                        fontSize: 20,
                        marginLeft: 10
                    }} />
            </h2>
            <div className="trend-videos blog-box">
                {trailers?.map((trailer, i) => (
                    <div key={i} className="">
                        <div className="post-media">
                            <Link href="tech-single.html" title="">
                                {trailer.trailers &&
                                    <div className="single-post-media">
                                        <ReactPlayer
                                            url={trailer.trailers}
                                            controls
                                            width='100%'
                                            height='300px'
                                            config={{
                                                youtube: {
                                                    playerVars: { showinfo: 1 }
                                                },
                                                facebook: {
                                                    appId: '12345'
                                                }
                                            }}
                                        />
                                    </div>
                                }
                                <div className="hovereffect">
                                    <span className="videohover"></span>
                                </div>
                            </Link>
                        </div>
                        <div className="blog-meta">
                            <h4><Link href="tech-single.html" title="">We prepared the best 10 laptop presentations for you</Link></h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TrailersWidgets;
