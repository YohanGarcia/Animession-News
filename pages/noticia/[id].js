import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "../../firebase";
import Error404 from "../../components/layout/404";
import Layout from "../../components/layout/Layout";
import { es } from "date-fns/locale";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatDistance } from 'date-fns';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";
import WidgetsNoticia from "../../components/layout/WidgetsNoticia";
import ReactPlayer from 'react-player'
import { Spiner } from "../../components/ui/spiner";
import { GridLoader } from "react-spinners"
import ModalLogin from "../../components/ModalLogin";

import toast from 'react-hot-toast'
const Noticia = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // state del componente
  const [noticia, guardarNoticias] = useState({});
  const [error, setError] = useState(false);

  const [consultaDB, guardarConsultaDB] = useState(true);

  // Routing para obtener el id actual
  const router = useRouter();
  const { query: { id } } = router;

  const { firebase, usuario } = useContext(FirebaseContext);

  const {
    posts1,
    posts2,
    posts3,
    posts4,
    posts5,
    posts6,
    titulo,
    urlimagen,
    trailers,
    votos,
    creado,
    creador,
    havotado,
    categoria,
    sinopsis
  } = noticia;

  const notify = () => toast.success(`Te a gustado la noticia ${titulo}`, {
    position: 'top-right',
    duration: 3000,
    // Change colors of success/error/loading icon
    iconTheme: {
      primary: '#fff',
      secondary: '#000',
    },
  });
  useEffect(() => {
    const obtenerNoticia = async () => {
      const noticiaQuery = await firebase.db.collection("noticias").doc(id);
      const getNoticia = await noticiaQuery.get();
      if (getNoticia.exists) {
        guardarNoticias(getNoticia.data());
        guardarConsultaDB(false);
      } else {
        setError(true);
        guardarConsultaDB(false);
      }
    };
    obtenerNoticia();
  }, [id, votos]);

  if (Object.keys(noticia).length === 0 && !error) return <Spiner><GridLoader color="#FF6347" /></Spiner>;

  // Administrar y validar votos
  const votarNoticia = () => {
    if (!usuario) {
      return handleShow()
    }
    const nuevoVotos = votos + 1;

    // Verificar si el usuario actual ha votado
    if (havotado?.includes(usuario.uid)) return;

    // Guardar el id del usuario que ha votado
    const nuevoHaVotado = havotado ? [...havotado, usuario.uid] : [usuario.uid];

    // Actualizar en la base de datos
    firebase.db
      .collection("noticias")
      .doc(id)
      .update({ votos: nuevoVotos, havotado: nuevoHaVotado });
    notify()
    // Actualizar el state
    guardarNoticias({
      ...noticia,
      votos: nuevoVotos,
    });
    guardarConsultaDB(true);
  };

  const puedeBorrar = () => {
    if (!usuario) return false;
    if (creador.id == usuario.uid) {
      return true;
    }
  };

  // eliminar una noticia de la base de datos
  const eliminarNoticia = async () => {
    if (!usuario) {
      return router.push("/login");
    }
    if (creador.id !== usuario.uid) {
      return router.push("/");
    }
    try {
      await firebase.db.collection("noticias").doc(id).delete();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  (function () { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'https://animedssionnews.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  })();



  return (
    <Layout>
      <>
        {error ? (
          <Error404 />
        ) : (
          <>

            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 blog-box">
              <div className="page-wrapper">
                <div className="blog-title-area text-center">
                  <span className="color-orange">
                    <Link href="" title="">{categoria?.nombre}</Link>
                  </span>
                  <h3>{titulo}</h3>
                  <div className="blog-meta big-meta">
                    <small ><Link href="" title="" className="fs-6">Hace {formatDistance(creado, new Date())}</Link></small>
                    <small className="fs-6"> <FontAwesomeIcon icon={faHeart} style={{ color: "red", fontSize: 20, paddingRight: 10 }} />
                      {" "} {votos}</small>
                  </div>
                  <div className="post-sharing">
                    <ul className="list-inline">
                      <div>
                        <button
                          type="button"
                          onClick={votarNoticia}
                          className="btn btn-default btn-block"
                        >
                          Follow <FontAwesomeIcon icon={faHeart} style={{ color: "red", fontSize: 20, paddingRight: 1 }} />
                        </button>
                      </div>
                    </ul>
                  </div>
                </div>
                <div className="single-post-media">
                  <img src={urlimagen} alt="" className="img-fluid" />
                </div>
                <div className="blog-content pt-3">
                  <div className="pp">
                    <p>{posts1} </p>
                  </div>
                  {posts2 &&
                    <>
                      <div className="pp">
                        <p>{posts2} </p>
                      </div>
                    </>
                  }
                  {posts3 &&
                    <>
                      <div className="pp ">
                        <p>{posts3} </p>
                      </div>
                    </>
                  }
                  {posts4 &&
                    <>
                      <div className="pp ">
                        <p>{posts4} </p>
                      </div>
                    </>
                  }
                  {posts5 &&
                    <>
                      <div className="pp ">
                        <p>{posts5} </p>
                      </div>
                    </>
                  }
                  {posts6 &&
                    <>
                      <div className="pp ">
                        <p>{posts6} </p>
                      </div>
                    </>
                  }
                  <hr className="invis" />

                  {trailers &&
                    <div className="single-post-media">
                      <ReactPlayer
                        url={trailers}
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
                  <hr className="invis" />
                  {sinopsis &&
                    <>
                      <div className="pp">
                        <h2>sinopsis</h2>
                        <p>{sinopsis} </p>

                      </div>
                      <hr className="invis" />
                    </>
                  }

                  {/* Banner */}
                  {/* <div className="row">
                    <div className="col-lg-12">
                      <div className="banner-spot clearfix">
                        <div className="banner-img">
                          <img src="upload/banner_01.jpg" alt="" className="img-fluid" />
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <hr className="invis" />
                  <div className="custombox prevnextpost clearfix">
                    <div className="row">
                      <div className="col-lg-5 blog-box">
                        <div className="blog-list-widget">
                          <div className="list-group">
                            <Link href="" className="list-group-item list-group-item-action flex-column align-items-start">
                              <div className="w-100 justify-content-between text-right">
                                <img src="" alt="" className="img-fluid float-right" />
                                <h5 className="mb-1">5 Beautiful buildings you need to before dying</h5>
                                <small>Prev Post</small>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-5 blog-box">
                        <div className="blog-list-widget">
                          <div className="list-group">
                            <Link href="" className="list-group-item list-group-item-action flex-column align-items-start">
                              <div className="w-100 justify-content-between">
                                <img src="" alt="" className="img-fluid float-left" />
                                <h5 className="mb-1">Let's make an introduction to the glorious world of history</h5>
                                <small>Next Post</small>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <WidgetsNoticia />
            <ModalLogin show={show} handleClose={handleClose} />
            <hr className="invis" />

            <div className="custombox clearfix blog-box">
              <div className="row">
                <div className="col-lg-12">
                  <div className="comments-list">
                    <div className="media">
                      {/* disqus */}
                      <div id="disqus_thread"></div>
                      <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    </Layout >
  );
};

export default Noticia;
