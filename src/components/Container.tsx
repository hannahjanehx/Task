import { ReactJSXElement } from "@emotion/react/types/jsx-namespace"
import { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";

type Container = {
    children: ReactNode,
    title: string,
    onClose: any,
    show: boolean
  };
  type Modal = {
    children: ReactNode,
    title: string,
    onClose: any
  };
type Backdrop = {
    onClose: any
};

  const ModalBackdrop = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.75);
  `;

  const ModalContent = styled.div`
    position: fixed;
    top: 30vh;
    left: 10%;
    width: 80%;
    z-index: 100;
    overflow: hidden;
    background-color: #fff;
    
    @media (min-width: 768px) {
        left: calc(50% - 20rem);
        width: 40rem;
    }
  `;

  const HeaderFooter = styled.div`
    padding: 10px;
    background-color: orchid;
  `;

  const ModalBody = styled.div`
    padding: 10px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  `;

    const StyledH2 =styled.h2`
        color: white;    
    `;

  const Backdrop = ({onClose} : Backdrop) => {
    return(<ModalBackdrop onClick={onClose} />);
  };

  const ModalOverlay = ({children, title, onClose} : Modal) => {
    return (
        <ModalContent>
            <HeaderFooter>
                <StyledH2 className="modal-title">{title}</StyledH2>
            </HeaderFooter>
            <ModalBody>
                { children }
            </ModalBody>
            <HeaderFooter>
                <button onClick={onClose}>Close</button>
            </HeaderFooter>
        </ModalContent>
    );
  }
  
  export const Container = ({children, title, onClose, show} : Container) => {

    if(!show) {
        return null;
    }

    // used for checking the screen size - wants to sit inside the page unless mobile / small then its a modal
    const [useModal, setUseModal] = useState((window.innerWidth < 767));

    useEffect(() => {
        const handleUseModal = () => {
            if(window.innerWidth > 767) {
                setUseModal(false);
            } else {
                setUseModal(true);
            }
        }
        window.addEventListener('resize', handleUseModal);

        return () => {
            window.removeEventListener('resize', handleUseModal);
        }
    });

    if(useModal) {

        return (

            <>
                {createPortal(<Backdrop onClose={onClose} />, document.getElementById('backdrop-root')!)}
                {createPortal(<ModalOverlay children={children} title={title} onClose={onClose} />, document.getElementById('overlay-root')!)}
            </>

        )
    } else {
        return (
            <div>
                <h2 className="modal-title">{title}</h2>
                <div>
                    { children }
                </div>
            </div>
        )
    }
  }