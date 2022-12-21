import React, { useContext, useState, useEffect } from 'react';
import { FirebaseContext } from '../firebase';

const UseCategoria = orden => {
    // const [listaCategorias, setListaCategorias] = useState([])
    const { firebase } = useContext(FirebaseContext);

    const [listaCategorias, setListaCategorias] = useState([])

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
    }, [nombre]);
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
        listaCategorias
    )
}

export default UseCategoria;
