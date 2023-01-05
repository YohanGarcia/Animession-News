import { useState, useContext, useEffect } from "react";
import Select from "react-select";
import toast from 'react-hot-toast'
import { FirebaseContext } from "../../firebase";
// validaciones
import useValidacion from "../../hooks/useValidacion";
import validarCrearNoticia from "../../validacion/validarCrearNoticia";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from "uuid"
import AuthenticatedRoute from "../AuthenticatedRoute";
import { useRouter } from "next/router";

const STATE_INICIAL = {
    titulo: '',
    posts1: '',
    urlimagen: '',
    trailers: '',
    sinopsis: ''
}

const NuevaNoticia = () => {

    const router = useRouter()
    // state de las imagenes
    const [urlimagen, guardarUrlImagen] = useState('');
    const [categoriaSelect, setCategoriaSelect] = useState({})
    const [subCategoriaSelect, setSubCategoriaSelect] = useState({})


    const [error, guardarErrore] = useState('');

    const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(STATE_INICIAL, validarCrearNoticia, crearNoticia);
    const { titulo, posts1, posts2 = '', posts3 = '', trailers, sinopsis } = valores;

    // context con las operaciones crud de firebase
    const { usuario, firebase, myFirebase } = useContext(FirebaseContext);

    const notify = () => toast.success("Noticia Creada!", {
        position: 'top-right',
        duration: 3000,
        // Change colors of success/error/loading icon
        iconTheme: {
            primary: '#fff',
            secondary: '#000',
        },
    });

    async function crearNoticia() {

        // crear el objeto de registar noticias
        const noticia = {
            titulo,
            posts1,
            posts2,
            posts3,
            urlimagen,
            trailers,
            sinopsis,
            votos: 0,
            creado: Date.now(),
            creador: {
                id: usuario.uid,
                nombre: usuario.displayName
            },
            havotado: [],
            categoria: {
                id: categoriaSelect.value,
                nombre: categoriaSelect.label
            },
            subcategoria: {
                id: subCategoriaSelect.value,
                nombre: subCategoriaSelect.label
                
            }
        }

        // insertarlo en la base de datos
        firebase.db.collection('noticias').add(noticia);
        notify()
        return router.push('/admin')
    }

    async function uploadFile(file) {
        const storageRef = ref(firebase.storage, `noticias/${v4()}`)
        await uploadBytes(storageRef, file).then(snapshot => {
            console.log(snapshot);
        })
        const url = await getDownloadURL(storageRef)
        guardarUrlImagen(url)
    }
    //  categoria

    const [listaCategorias, setListaCategorias] = useState([])
    const [listaSubCategorias, setListaSubCategor] = useState([])

    useEffect(() => {
        const getLista = async () => {
            try {
                const obtenerCategoria = () => {
                    firebase.db
                        .collection("categoria")
                        .orderBy('creado', "desc")
                        .onSnapshot(manejarSnapshot);
                };
                const obtenerSubCategoria = () => {
                    firebase.db
                        .collection("subcategoria")
                        .orderBy('creado', "desc")
                        .onSnapshot(manejarSnapshot2);
                };
                obtenerSubCategoria()
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

    function manejarSnapshot2(snapshot) {
        const subCategorias = snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        });
        setListaSubCategor(subCategorias)
    }

    const handleSelectChange = (e) => {
        console.log(e);
        setCategoriaSelect(e)
    };
    const handleSelectChange2 = (e) => {
        console.log(e);
        setSubCategoriaSelect(e)
    };

    return (
        <>
            <div className='user'>
                <img
                    src={urlimagen}
                    alt=""
                    className='user__avatar img-thumbnail'
                />

            </div>
            <h2 className="">Nueva Noticia</h2>
            {error && <p className="">{error}</p>}
            <form onSubmit={handleSubmit} noValidate className="blog-box px-5">
                <div className="row">
                    <div className="col-6 pt-2">
                        <label className="" htmlFor="form3Example1cg">Categoria: {categoriaSelect.label}</label>
                        <Select
                            options={listaCategorias.map(category => ({
                                label: category.nombre,
                                value: category.id,
                            }))}
                            onChange={handleSelectChange}
                        />
                    </div>
                    <div className="col-6 pt-2">
                        <label className="" htmlFor="form3Example1cg">Sub-Categoria: {categoriaSelect.label}</label>
                        <Select
                            options={listaSubCategorias.map(category => ({
                                label: category.nombre,
                                value: category.id,
                            }))}
                            onChange={handleSelectChange2}
                        />
                    </div>
                    <div className="col-6 pt-2">
                        <label className="" htmlFor="form3Example1cg">titulo</label>
                        <input
                            type="text"
                            name="titulo"
                            id="form3Example1cg"
                            className="form-control"
                            value={titulo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errores.titulo && <p className="">{errores.titulo}</p>}
                    </div>
                    <div className="col-6 pt-2">
                        <label className="" htmlFor="exampleFormControlTextarea1">contenido 1</label>
                        <textarea
                            type="text"
                            name="posts1"
                            id="fexampleFormControlTextarea1"
                            className="form-control"
                            aria-label="With textarea"
                            value={posts1}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errores.posts1 && <p className="">{errores.posts1}</p>}
                    </div>
                    <div className="col-6 pt-2">
                        <label className="" htmlFor="exampleFormControlTextarea1">contenido 2</label>
                        <textarea
                            type="text"
                            name="posts2"
                            id="fexampleFormControlTextarea1"
                            className="form-control"
                            aria-label="With textarea"
                            value={posts2}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    <div className="col-6 pt-2">
                        <label className="" htmlFor="exampleFormControlTextarea1">contenido 3</label>
                        <textarea
                            type="text"
                            name="posts3"
                            id="fexampleFormControlTextarea1"
                            className="form-control"
                            aria-label="With textarea"
                            value={posts3}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    <div className="col-6 pt-2">

                        <label htmlFor="formFileSm" className="f">Imagen</label>
                        <input
                            className="form-control"
                            type="file"
                            id="formFileSm"
                            name="imagen1"
                            aria-describedby="inputGroupFileAddon04"
                            aria-label="Upload"
                            onChange={e => uploadFile(e.target.files[0])}
                        />

                        {errores.imagen1 && <p className="r">{errores.imagen1}</p>}
                    </div>
                    <div className="col-6 pt-2">
                        <label for="basic-url" className="form-label">URL del trailer</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon3">https://example.com/</span>
                            <input
                                type="text"
                                className="form-control"
                                id="basic-url"
                                aria-describedby="basic-addon3"
                                name="trailers"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                    </div>
                    <div className="col-6 pt-2">
                        <label className="" htmlFor="form3Example1cg">Sinopsis</label>
                        <textarea
                            type="text"
                            id="form3Example1cg"
                            className="form-control"
                            name="sinopsis"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                </div>
                <div className="text-center pt-4 pb-5">
                    <button type="submit" className="text btn btn-sucess">Crear Noticia</button>
                </div>
            </form>
        </>
    );
}

NuevaNoticia.Auth = AuthenticatedRoute
export default NuevaNoticia;
