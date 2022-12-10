import React from "react";
import Layout from "../components/layout/Layout";
import DetallesNoticia from "../components/layout/DetallesNoticia"
import UseNoticias from "../hooks/useNoticias";

export default function Pospulare() {

    const {noticias} = UseNoticias('votos')

    return (
        <div>
            <Layout>
                    {noticias.map((noticia) => (
                        <DetallesNoticia
                            key={noticia.id}
                            noticia={noticia}
                        />
                    ))}
            </Layout>
        </div>
    );
}
