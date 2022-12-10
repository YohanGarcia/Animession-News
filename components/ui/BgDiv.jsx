import styled from 'styled-components';

export const BgDiv = styled.div`
    &.active{
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(0,0,0,0.66);
    pointer-events: none;
    transition: opacity .3s;
    left: 0;
  }
  
    @media(min-width: 768px){
      &.active{
        display: none;
    }
  }
 
`