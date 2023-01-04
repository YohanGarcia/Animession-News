import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import DetallesNoticia from "../components/layout/DetallesNoticia";
import UseNoticias from "../hooks/useNoticias";
import TopNoticia from "../components/layout/TopNoticia";
import { GridLoader } from "react-spinners"
import { Spiner } from "../components/ui/spiner";
export default function Home() {
  const { noticias } = UseNoticias("creado");
  const [error, setError] = useState(false);
  
  if (Object.keys(noticias).length === 0 && !error) return <Spiner><GridLoader color="#FF6347" /></Spiner>;

  return (
    <>
      <Layout title="Listado de noticias">
        <TopNoticia />
        {noticias.map((noticia) => (
          <DetallesNoticia key={noticia.id} noticia={noticia} />
        ))}
      </Layout>
    </>
  );
}
