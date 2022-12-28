import Link from 'next/link';
import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../firebase';


const Footer = () => {
    const [listaCategorias, setListaCategorias] = useState([])
    const { usuario, firebase } = useContext(FirebaseContext)


    useEffect(() => {
        const getLista = async () => {
            try {
                const obtenerCategoria = () => {
                    firebase.db
                        .collection("categoria")
                        .orderBy('creado', "desc")
                        .onSnapshot(manejarSnapshot);
                };
                obtenerCategoria();
            } catch (error) {
                console.log(error);
            }
        }
        getLista()
    }, []);
    function manejarSnapshot(snapshot) {
        const categorias = snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        });
        setListaCategorias(categorias)
    }

    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7">
                        <div className="widget">
                            <div className="footer-text text-left">
                                <Link href="index.html"><img src="" alt="" className="img-fluid" /></Link>
                                <p><span className='fs-5 text-danger'> Animesssion New </span>es un noticiero referente al anime, video juegos y entrevistas a mangakas en el cual nos proponemos a ofrecerles las ultimas noticias sobre este mundo.</p>
                                {/* <div className="social">
                                    <Link href="#" data-toggle="tooltip" data-placement="bottom" title="Facebook"><i className="fa fa-facebook"></i></Link>
                                    <Link href="#" data-toggle="tooltip" data-placement="bottom" title="Twitter"><i className="fa fa-twitter"></i></Link>
                                    <Link href="#" data-toggle="tooltip" data-placement="bottom" title="Instagram"><i className="fa fa-instagram"></i></Link>
                                    <Link href="#" data-toggle="tooltip" data-placement="bottom" title="Google Plus"><i className="fa fa-google-plus"></i></Link>
                                    <Link href="#" data-toggle="tooltip" data-placement="bottom" title="Pinterest"><i className="fa fa-pinterest"></i></Link>
                                </div> */}

                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12">
                        <div className="widget">
                            <h2 className="widget-title">Categories</h2>
                            <div className="link-widget">
                                <ul>
                                    {listaCategorias.slice(0, 4).map((category, index) => (
                                        <li key={index}><Link href="#">{category.nombre}</Link></li>

                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 text-center">
                        <br />
                        <div className="copyright">&copy; Pagina oficial. Animession: <Link href="https://www.facebook.com/AnimessionZBT">Facebook Animession</Link>.</div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
