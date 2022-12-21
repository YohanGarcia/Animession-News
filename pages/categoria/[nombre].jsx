import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "../../firebase";

const Categoria = () => {

//   const [noticia, guardarNoticias] = useState({});
//   const router = useRouter();
//   const { query: { id } } = router;
//   const { firebase, usuario } = useContext(FirebaseContext);
//   const {collection, query, where, db} = firebase
//   const citiesRef = collection(db, "noticias")
//   const q = query(citiesRef, where('anime', '==', 'anime'));
// console.log(q);
  return (
        <div>
            <h1>categoria</h1>
        </div>
    );
}

export default Categoria;
