import styled from 'styled-components';


export const Nav = styled.nav`
    display: grid;
    grid-template-columns: repeat(2, max-content);
    align-items: center;
    justify-content: space-between;
    height: 80px;
    background-color: #5694b167;
    padding: 10px;
    &{
      @media (min-width: 768px) {
        grid-template-columns: repeat(2, max-content);
        align-items: center;
        height: 80px;
      
      }
    }
  
  .nav__links{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 60%;
    max-width: 330px;
    background-color: var(--fff-white);

    display: grid;
    gap: 1em;
    grid-auto-rows: max-content;
    padding: 100px 0 80px 40px;
    overflow-y: auto;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 1;
    a{
      color: var(--dark-grayish-blue);
        font-weight: 500;
        font-size: 1.5rem;
    }
   
  }


  .nav__links.active{
   opacity: 1;
   pointer-events: unset;
   transition-duration: .6s;  
  }
  @media(min-width: 768px){
    .nav__links.active{
      display:none ;
    }
    .burguer {
      display: none;  
    }
    
    .nav__links{
      position: unset;

      width: unset;
      max-width: unset;

      gap: 1.5em;
      grid-auto-flow: column;
      padding: 0;
      overflow-y: unset;
      pointer-events: unset;
      opacity: 1;
      transition: none;  
      background-color: unset;
      a{
        color: var(--dark-grayish-blue);
        font-weight: 500;
        font-size: 1.5rem;
        background-color: unset;
    }
    }
  }

/* User STAR */
.contenedor__logo {
  width: 170px;
  height: 80px;
  display: flex;
  margin-top: 10px;
}
.nav__logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 5px blue);
}
.user__avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: -1rem;
  margin-top: -5px;
  cursor: pointer;
  filter: drop-shadow(0 0 5px blue);
  
}
.admin{
  display: flex;
  align-items: block;
  
  @media(min-width: 768px)  {
    justify-content: flex-end;
  }

}
/* User end */
`