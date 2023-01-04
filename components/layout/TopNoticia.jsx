import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss } from '@fortawesome/free-solid-svg-icons'
import UseNoticias from '../../hooks/useNoticias';

import ListsNews from './ListsNews';
import Widgets from './Widgets';

const TopNoticia = () => {

    const { noticias } = UseNoticias('creado')

    return (
        <>
            <div className='col-lg-8 col-md-12 col-sm-12 col-xs-12'>
                <div className='page-wrapper'>
                    <div className='blog-top clearfix'>
                        <h4 className="pull-left">
                            Recent News
                            <FontAwesomeIcon icon={faRss} style={{ color: "#FF6347", fontSize: 20, marginLeft: 10 }} />

                        </h4>
                    </div>
                    <div className="blog-list clearfix">
                        {noticias.slice(0, 8).map((noticia, index) => (
                            <ListsNews key={index} noticia={noticia} />
                        ))}
                    </div>
                </div>
                <hr className="invis" />
            </div>
            <Widgets noticia={noticias} />
        </>
    );
}

export default TopNoticia;
