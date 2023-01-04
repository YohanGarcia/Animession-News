import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss } from '@fortawesome/free-solid-svg-icons'
import ListsNews from '../layout/ListsNews';
import UseNoticias from '../../hooks/useNoticias';


const Populares = () => {
    const { noticias } = UseNoticias('votos')
    return (
        <>
            <div className='blog-top clearfix pt-4'>
                <h4 className="pull-left">
                    Notiacias mas populares
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

export default Populares;
