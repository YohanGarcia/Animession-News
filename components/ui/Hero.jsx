import styled from 'styled-components';


export const Hero = styled.section`
  grid-area: hero;
  border-radius: 15px;
  box-shadow: 10px 10px 10px rgba(35, 35, 36, 0.781);

  margin-top: 20px;
  @media (min-width: 768px) {
    display: grid;
    align-content: space-between;
  }
  
`

export const ImgTop = styled.div`
    margin: 0 auto;
    width: 100%;
    aspect-ratio: 1/1;
    max-height: 300px;
    background-size: cover;
    background-image: ${props => `url(${props.background})`};

    
`
export const TextTop = styled.article`
    padding: 3em 0;
    @media (min-width: 768px) {
        display: flex;
        gap: 2em;
        align-items: center;
        padding: 0;
        .hero__cta {
            align-self: flex-start;
        }
        .hero__copy {
            width: 50%;
            align-self: stretch;
            gap: 1em;

            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
    }
    .hero__cta {
        background-color: var(--soft-red);
        color: var(--fff-white);

        display: inline-block;
        text-decoration: none;
        padding: 1em 2.3em;
        text-transform: uppercase;
        font-weight: 500;

        letter-spacing: 1px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(92, 92, 95, 0.61);
        transition: 0.4s;
    }
    .hero__cta:hover{
        color: black;
        background-color: var(--white);
    }
`

export const TitleTop = styled.h1`
    font-size: 1rem;
    @media (min-width: 768px) {
        width: 50%;
        font-size: 3rem;
        
    }

`
export const PostsTop = styled.p`
    line-height: 1.5;
    margin: 1em 0;
    @media (min-width: 768px) {
        margin: 0;
    }
`

export const BlogTop = styled.div`
    margin-bottom: 2rem;
    h4 {
        padding: 0;
        margin: 0;
        line-height: 1;
    }
`

export const PostsMedia = styled.div`
    img{
        width: 100%;
        -webkit-transition: all .3s ease-in-out;
        -moz-transition: all .3s ease-in-out;
        -ms-transition: all .3s ease-in-out;
        -o-transition: all .3s ease-in-out;
        transition: all .3s ease-in-out;
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -ms-transform: scale(1);
        -o-transform: scale(1);
        transform: scale(1);
    }
    &:hover img {
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -ms-transform: scale(1.1);
        -o-transform: scale(1.1);
        transform: scale(1.1);
    }
    &{
        position: relative;
        overflow: hidden;
    }
    &:hover .hovereffect span::before,
    &:hover .hovereffect {
        visibility: visible;
        zoom: 1;
        filter: alpha(opacity=100);
        opacity: 1;
    }
   
`

export const Col4 = styled.div`
    width: 40%;
`
export const Col8 = styled.div`
    width: 80%;
    
`