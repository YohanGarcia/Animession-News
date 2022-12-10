import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "../../firebase";
import Error404 from "../../components/layout/404";
import Layout from "../../components/layout/Layout";
import { es } from "date-fns/locale";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {
  Hero,
  ImgTop,
  TextTop,
  TitleTop,
  PostsTop,
  Aside,
  AsideH2,
  VotarAside,
  ImgContent,
  Img

} from "../../components/ui";

const Noticia = () => {
  // state del componente
  const [noticia, guardarNoticias] = useState({});
  const [error, setError] = useState(false);
  const [comentario, gurdarComentarios] = useState({});
  const [consultaDB, guardarConsultaDB] = useState(true);

  // Routing para obtener el id actual
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { firebase, usuario } = useContext(FirebaseContext);

  const {
    posts1,
    titulo,
    urlimagen,
    votos,
    creado,
    comentarios,
    creador,
    havotado,
  } = noticia;

  useEffect(() => {
    if (id && consultaDB) {
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
    }
  }, [id]);

  if (Object.keys(noticia).length === 0 && !error) return "Cargando noticia...";

  // Administrar y validar votos
  const votarNoticia = () => {
    if (!usuario) {
      return router.push("/login");
    }
    const nuevoVotos = votos + 1;

    // Verificar si el usuario actual ha votado
    if (havotado.includes(usuario.uid)) return;

    // Guardar el id del usuario que ha votado
    const nuevoHaVotado = [...havotado, usuario.uid];

    // Actualizar en la base de datos
    firebase.db
      .collection("noticias")
      .doc(id)
      .update({ votos: nuevoVotos, havotado: nuevoHaVotado });

    // Actualizar el state
    guardarNoticias({
      ...noticia,
      votos: nuevoVotos,
    });
    guardarConsultaDB(true);
  };

  // Funciones para crear cometarios
  const cometariosChange = (e) => {
    gurdarComentarios({
      ...comentario,
      [e.target.name]: e.target.value,
    });
  };

  // Indetificar si el comentario es del creador dela noticia
  const esCreador = (id) => {
    if (creador.id == id) {
      return true;
    }
  };

  const agregarCometarios = (e) => {
    e.preventDefault();
    if (!usuario) {
      return router.push("/login");
    }
    // informacion extra al comentario
    comentario.usuarioId = usuario.uid;
    comentario.usuarioNombre = usuario.displayName;
    comentario.creado = Date.now();

    // Tomar copia de comentarios y agregarlo al arreglo
    const nuevosComentarios = [...comentarios, comentario];

    // Actualizar la base de datos
    firebase.db.collection("noticias").doc(id).update({
      comentarios: nuevosComentarios,
    });

    // Actualizar el stata
    guardarNoticias({
      ...noticia,
      comentarios: nuevosComentarios,
    });
    guardarConsultaDB(true);
  };

  // Funcion que revisa que el creador de la noticia sea el mismo que esta autenticado
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

  return (
    <Layout>
      <>
        {error ? (
          <Error404 />
        ) : (
          // <>
          //   <Hero>
          //     <TextTop>
          //       <TitleTop fontSize='5px'>{titulo}</TitleTop >
          //     </TextTop>
          //     <ImgContent>
          //       <Img src={urlimagen} />
          //     </ImgContent>

          //   </Hero>
          //   <VotarAside>
          //     <div>
          //       <p>Follows {" "} {votos} </p>
          //       <button
          //         type="button"
          //         onClick={votarNoticia}
          //       >
          //         Follow
          //       </button>
          //     </div>
          //     <div>
          //       {puedeBorrar() && (
          //         <button
          //           type="button"
          //           onClick={eliminarNoticia}
          //         >
          //           Eliminar noticia
          //         </button>
          //       )}
          //     </div>
          //   </VotarAside>
          // </>
          <div className="noticia">
            <h1>{titulo}</h1>
            <div>
              <div>
                <p>
                  Publicado hace{" "}
                  {creado
                    ? formatDistanceToNow(new Date(creado), { locale: es })
                    : null}{" "}
                </p>
                <aside>
                  <p>{votos} Votos</p>
                  <button
                    type="button"
                    className="btn btn-light btn-sm border border-1 border-info rounded-4"
                    onClick={votarNoticia}
                  >
                    Votar
                  </button>
                  {puedeBorrar() && (
                    <button
                      type="button"
                      className="btn btn-light btn-sm border border-1 border-info rounded-4"
                      onClick={eliminarNoticia}
                    >
                      Eliminar noticia
                    </button>
                  )}
                </aside>
                <div>
                  <p>Creado por: {creador && creador.nombre}</p>
                </div>

                <img src={urlimagen} className="my_img" />
                <p>{posts1}</p>
                {usuario && (
                  <>
                    <h2>Agrega tu comentario</h2>
                    <form onSubmit={agregarCometarios}>
                      <div>
                        <input
                          type="text"
                          name="mensaje"
                          placeholder="Comentario"
                          onChange={cometariosChange}
                        />
                      </div>
                      <div>
                        <input type="submit" value="Agregar Comentario" />
                      </div>
                    </form>
                  </>
                )}
              </div>
              <div className="container mt-5">
                <div className="row  d-flex justify-content-center">
                  <div className="col-md-8">
                    <div className="headings d-flex justify-content-between align-items-center mb-3">
                      <h5>Lista de comentarios({comentarios?.length})</h5>

                      <div className="buttons">
                        <span className="badge bg-white d-flex flex-row align-items-center">
                          <span className="text-primary">Comments "ON"</span>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="flexSwitchCheckChecked"
                            />
                          </div>
                        </span>
                      </div>
                    </div>
                    <div className="card p-3">
                      {comentarios &&
                        comentarios.map((comentario, i) => (
                          <div
                            className="card p-3 mt-2"
                            key={`${comentario.usuarioId}-${i}`}
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="user d-flex flex-row align-items-center">
                                <img
                                  src="https://i.imgur.com/0LKZQYM.jpg"
                                  width="30"
                                  className="user-img rounded-circle mr-2"
                                />
                                <span>
                                  <small className="font-weight-bold text-primary">
                                    {esCreador(comentario.usuarioId) && (
                                      <span className="font-weight-bold">
                                        Admin:{" "}
                                      </span>
                                    )}

                                    {comentario.usuarioNombre}
                                  </small>{" "}
                                  <small className="font-weight-bold">
                                    {comentario.mensaje}{" "}
                                  </small>
                                </span>
                              </div>

                              <small>
                                Hace{" "}
                                {comentario.creado
                                  ? formatDistanceToNow(
                                      new Date(comentario.creado),
                                      {
                                        locale: es,
                                      }
                                    )
                                  : null}{" "}
                              </small>
                            </div>

                            <div className="action d-flex justify-content-between mt-2 align-items-center">
                              <div className="reply px-4">
                                <small>Remove</small>
                                <span className="dots"></span>
                                <small>Reply</small>
                                <span className="dots"></span>
                                <small>Translate</small>
                              </div>

                              <div className="icons align-items-center">
                                <i className="fa fa-user-plus text-muted"></i>
                                <i className="fa fa-star-o text-muted"></i>
                                <i className="fa fa-check-circle-o check-icon text-primary"></i>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </Layout>
  );
};

export default Noticia;
