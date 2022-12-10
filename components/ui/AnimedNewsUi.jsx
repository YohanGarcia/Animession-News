import styled from 'styled-components';

export const SecionNews = styled.section`
    grid-area: products;
    padding: 4em 0;
    display: grid;
    gap: 2em;
   
    @media (min-width: 768px) {
        grid-auto-flow: column;
        padding: 1em 0 4em;
    }
`
export const ContenedorNews = styled.div`
    display: grid;
    gap: 2em 2em;

    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2em 2em;
        
    }
`
export const Article = styled.article`
    display: flex;
    gap: 1em;
    border-radius: 15px;
    box-shadow: 10px 10px 10px rgba(35, 35, 36, 0.781);
    overflow: hidden;
    transition: all .5ms;
    .article__img{
        width: 30%;
        max-width: 150px;
        object-fit: cover;
        
        align-self: start;
    }
    @media (min-width: 768px) {
        display: flex;
        gap: 1em;
        max-width: 100%;
        height: 250px;
        .article__img{
            width: 40%;
            max-width: 250px;
            height:250px;
            object-fit: cover;
        
            align-self: start;
        }
    }
    &:hover {
    border: 1px solid #000;
    box-shadow: none;
    z-index: 500;
    
  }
`

export const ArticleTexts = styled.div`
    width: 70%;
    flex: 1;
    @media (min-width: 768px) {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
`
export const ArticleFecha = styled.p`
    font-size: 1rem;
    font-weight: bold;
    color: var(--grayish-blue);
    @media (min-width: 768px) {
        font-size: 1.2rem;
        font-weight: bold;
        color: var(--grayish-blue);
    }
`
export const ArticleTitulo = styled.h3`
    font-size: 1.2rem;
    margin: 0.5rem 0;
    @media (min-width: 768px) {
        font-size: 1.2rem;
        margin: 0.5rem 0;
    }
`

export const ArticleDescricion = styled.p`
    @media (min-width: 768px) {
       
    }
`