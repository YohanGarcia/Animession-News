import React, { useContext, useState, useEffect } from 'react';
import { FirebaseContext } from '../firebase';

const UseCategoria = orden => {
    // const [listaCategorias, setListaCategorias] = useState([])
    const { firebase } = useContext(FirebaseContext);

    const [noticias, setListaCategorias] = useState([])

    useEffect(() => {
        const getLista = async () => {
            try {
                const obtenerCategoria = () => {
                    firebase.db
                        .collection("noticias")
                        .where('categoria', '==', 'nombre/Estrene 2023')
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
        const noticias = snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        });
        console.log(noticias);
        setListaCategorias(noticias)
    }

    return (
        noticias
    )
}

export default UseCategoria;
