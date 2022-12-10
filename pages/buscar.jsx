import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from "../components/layout/Layout";
import DetallesNoticia from "../components/layout/DetallesNoticia"
import UseNoticias from "../hooks/useNoticias";

const Busca = () => {

    const router = useRouter();
    const { query: { q } } = router

    // todos las noticias
    const { noticias } = UseNoticias('creado');
    const [resultado, guardarResultado] = useState([])

    useEffect(() => {
        const busqueda = q?.toLowerCase() || '';
        const filtro = noticias.filter(noticia => {
            return (
                noticia.titulo.toLowerCase().includes(busqueda)
            )
        });
        guardarResultado(filtro);
    }, [q, noticias]);

    return (
        <div>
        <Layout>
            {resultado.map((noticia) => (
              <DetallesNoticia 
                key={noticia.id}
                noticia={noticia}
              />
               ))}
        </Layout>
      </div>
    );
}

export default Busca;
