import React, { useState,useRef } from 'react';
import Router from 'next/router';
// import { Form } from './BuscarUi';
import styled from "styled-components";
import CircumIcon from "@klarr-agency/circum-icons-react"; 

const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 10px rgba(35, 35, 36, 0.781);

  background-color: white;
  /* Change width of the form depending if the bar is opened or not */
  width: ${props => (props.barOpened ? "90%" : "2rem")};
  /* If bar opened, normal cursor on the whole form. If closed, show pointer on the whole form so user knows he can click to open it */
  cursor: ${props => (props.barOpened ? "auto" : "pointer")};
  padding: 1.1rem;
  height: 2rem;
  border-radius: 10rem;
  transition: width 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

    @media(min-width: 768px){
        margin-right: 10rem;
    }

`;

const Input = styled.input`
  font-size: 14px;
  line-height: 1;
  background-color: transparent;
  width: 100%;
  margin-left: ${props => (props.barOpened ? "1rem" : "0rem")};
  border: none;
  color: black;
  transition: margin 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

  &:focus,
  &:active {
    outline: none;
  }
  &::placeholder {
    color: black;
  }
`;

const Button = styled.button`
  line-height: 1;
  pointer-events: ${props => (props.barOpened ? "auto" : "none")};
  cursor: ${props => (props.barOpened ? "pointer" : "none")};
  background-color: transparent;
  border: none;
  outline: none;
  color: black;
`;

const Buscar = () => {
    const [busqueda, guardarBusqueda] = useState('');

    const bucarNoticia = e => {
        e.preventDefault();
        console.log("buscando...", busqueda);

        if (busqueda.trim() === '') return;

        // Redirecionar a /buscar
        Router.push({
            pathname: '/buscar',
            query: {
                q: busqueda,
            }

        })
    }
    const [input, setInput] = useState("");
    const [barOpened, setBarOpened] = useState(false);
    const formRef = useRef();
    const inputFocus = useRef();

    return (
        <>
            {/* <Form 
                onSubmit={bucarNoticia}
                role="search"
            >
                <label for="search">Search for stuff</label>
                <input
                    id="search" 
                    type="search" 
                    placeholder="Search..." 
                    autofocus 
                    required
                    onChange={e => guardarBusqueda(e.target.value)}
                />
                 <button type="submit">Go</button> 



            </Form> */}
            <Form
                barOpened={barOpened}
                onClick={() => {
                    // When form clicked, set state of baropened to true and focus the input
                    setBarOpened(true);
                    inputFocus.current.focus();
                }}
                // on focus open search bar
                onFocus={() => {
                    setBarOpened(true);
                    inputFocus.current.focus();
                }}
                // on blur close search bar
                onBlur={() => {
                    setBarOpened(false);
                }}
                // On submit, call the onFormSubmit function
                onSubmit={bucarNoticia}
                ref={formRef}
            >
                <Button type="submit" barOpened={barOpened}>
                <CircumIcon name="search"/>
                </Button>
                <Input
                    onChange={e => guardarBusqueda(e.target.value)}
                    ref={inputFocus}
                    barOpened={barOpened}
                    required
                    placeholder="Buscar Noticia..."
                />
            </Form>
        </>
    );
}

export default Buscar;
