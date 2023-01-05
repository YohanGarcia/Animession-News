import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../firebase';

const UseSubCategoria = orden => {
  const [noticias, guardarNoticias] = useState([]);

  const { firebase } = useContext(FirebaseContext);


  useEffect(() => {
    const obtenerNoticias = () => {
      firebase.db
        .collection("noticias")
        .orderBy(orden, "desc")
        .onSnapshot(manejarSnapshot);
    };
    obtenerNoticias();
  }, []);

  function manejarSnapshot(snapshot) {
    const noticias = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    guardarNoticias(noticias);
  }
  return {
    noticias
  }
}

export default UseSubCategoria;
