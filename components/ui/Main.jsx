import styled from 'styled-components';

export const Main = styled.main`
    display: grid;
    padding: 10px;
    grid-template-rows: repeat(3, max-content);
    grid-template-areas: 
        "hero"
        "aside"
        "products"
    ;
    &{
    @media (min-width: 768px) {
        grid-template-rows: repeat(2, max-content);
        grid-template-areas:
        "hero hero hero aside aside"
        "products products products products products";
        gap: 2em 2em;
    }
}
 
`
