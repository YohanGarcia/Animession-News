import styled from 'styled-components';

export const Aside = styled.aside`
    grid-area: aside;
    background-color: var(--very-dark-blue);
    color: var(--fff-white);
    padding: 2.5em 1em;
    border-radius: 15px;
    box-shadow: 10px 10px 10px rgba(35, 35, 36, 0.781);

    margin-top: 20px;
`

export const AsideH2 = styled.h2`
    font-size: 2em;
    color: var(--soft-orange);
    margin-bottom: 1rem;
    @media (min-width: 768px) {
        font-size: 2.5em;
    }
`

export const AsideArticle = styled.article`
    padding: 1.3em 0;
    border-bottom: 1px solid var(--grayish-blue);
    &:last-of-type{
        padding-bottom: 0;
        border-bottom: none;
    }
    
`

export const AsideH3 = styled.h3`
    margin-bottom: 1rem;
`

export const AsideP = styled.p`
    line-height: 1.5;
    color: var(--grayish-blue);
    
`