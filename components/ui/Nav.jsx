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
  width: 200px;
  height: 80px;
  display: flex;
  align-items: center;
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

  cursor: pointer;
  filter: drop-shadow(0 0 5px blue);
}

.user {

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

export const Logout = styled.button`
  color: rgb(104, 85, 224);
  background-color: #cfcccc57;
  border-radius: 10%;
  padding: 1px;
  box-shadow: 10px 10px 10px rgba(35, 35, 36, 0.781);

  &:hover{
    box-shadow: 0 0 20px rgba(56, 56, 61, 0.226);
  }

`
export const Botton = styled.button`
  cursor: pointer;
  border: 0;
  border-radius: 8px;
  font-weight: 600;
  margin: 0 6px;
  width: 110px;
  padding: 3px 0;
  box-shadow: 10px 10px 10px rgba(35, 35, 36, 0.781);

  transition: 0.4s;
  &:hover {
    color: white;
  
    box-shadow: 0 0 20px rgba(104, 85, 224, 0.6);
    background-color: var(--soft-red);
  }


`