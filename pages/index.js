import React from "react";
import Layout from "../components/layout/Layout";
import DetallesNoticia from "../components/layout/DetallesNoticia";
import UseNoticias from "../hooks/useNoticias";
import TopNoticia from "../components/layout/TopNoticia";
import { ContenedorNews, SecionNews } from "../components/ui";
import SessionAnimedNesws from "../components/layout/SessionAnimedNesws";

export default function Home() {
  const { noticias } = UseNoticias("creado");


  return (
    <>
      <Layout title="Listado de noticias">
        <TopNoticia />
        <SecionNews>
          <ContenedorNews>
            {noticias.map((noticia) => (
              <SessionAnimedNesws key={noticia.id} noticia={noticia} />
            ))}
          </ContenedorNews>
        </SecionNews>
        {noticias.map((noticia) => (
          <DetallesNoticia key={noticia.id} noticia={noticia} />
        ))}
      </Layout>
    </>
  );
}
