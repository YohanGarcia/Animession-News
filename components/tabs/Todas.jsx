import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss } from '@fortawesome/free-solid-svg-icons'
import ListsNews from '../layout/ListsNews';
import UseNoticias from '../../hooks/useNoticias';
import UseNoticiasDesc from '../../hooks/useNoticiasDesc';


const Todas = () => {
    const { noticias } = UseNoticiasDesc()
    return (
        <>
            <div className='blog-top clearfix pt-4'>
                <h4 className="pull-left">
                    Lista de Noticias
                    <FontAwesomeIcon icon={faRss} style={{ color: "#FF6347", fontSize: 20, marginLeft: 10 }} />
                </h4>
            </div>
            <div className='page-wrapper'>
                <div className="blog-list clearfix">
                    {noticias.map((noticia, index) => (
                        <ListsNews key={index} noticia={noticia} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Todas;
