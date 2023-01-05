import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss } from '@fortawesome/free-solid-svg-icons'
import ListsNews from '../layout/ListsNews';
import { FirebaseContext } from '../../firebase';
const Invierno = () => {

    const { firebase } = useContext(FirebaseContext)
    const [listaCategorias, setListaCategorias] = useState([])

    // useEffect(() => {
    //     const getLista = async () => {
    //         try {
    //             const obtenerCategoria = () => {
    //                 firebase.db
    //                     .collection("noticias")
    //                     .where('categoria.nombre', '==', 'Estrenos 2023')
    //                     .where('subcategoria.nombre', '==', 'Verano')
    //                     .orderBy('creado', "desc")
    //                     .onSnapshot(manejarSnapshot);
    //             };
    //             obtenerCategoria();
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     getLista()
    // }, []);
    // function manejarSnapshot(snapshot) {
    //     const categorias = snapshot.docs.map((doc) => {
    //         return {
    //             id: doc.id,
    //             ...doc.data(),
    //         };
    //     });
    //     setListaCategorias(categorias)
    // }
    return (
        <>
            <div className='blog-top clearfix pt-4'>
                <h4 className="pull-left">
                    Estreno 2023, Invierno
                    <FontAwesomeIcon icon={faRss} style={{ color: "#FF6347", fontSize: 20, marginLeft: 10 }} />
                </h4>
            </div>
            {/* <div className='page-wrapper'>
                <div className="blog-list clearfix">
                    {listaCategorias.map((noticia, index) => (
                        <ListsNews key={index} noticia={noticia} />
                    ))}
                </div>
            </div> */}
        </>
    );
}

export default Invierno;
