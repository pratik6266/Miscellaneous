import React, { createContext, useContext, useRef, useState } from 'react';
import './styles.css';
import { createPortal } from 'react-dom';

type ContextProps = {
  content: string
}
type PowerProps = {
  node?: React.ReactNode
  label: string
}
type PopOverProps = {
  children: React.ReactNode;
}
type PopContextProps = {
  open: boolean;
  handleClick: () => void;
  contextRef: React.RefObject<HTMLButtonElement | null>; 
  contentRef: React.RefObject<HTMLDivElement | null>;
}
const PopOverContext = createContext<PopContextProps | null>(null);

const PopOverComponent: React.FC<PopOverProps> = ({ children }) => {

  const [open, setOpen] = useState(false);
  const contextRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const handleClick = () => {
    const prev = open;
    setOpen(!prev);

    if(!prev) {
      const { top, height } = contextRef.current!.getBoundingClientRect();
      const contentPosition = top + height + (contentRef.current?.offsetHeight || 0);
      if(contentPosition >= window.innerHeight) {
        contentRef.current!.style.top = `${top - contentPosition}px`;
      }
    }
  }

  return (
    <>
      <PopOverContext.Provider value={{ open, handleClick, contextRef, contentRef }}>
        <div className='popover'>
          {children}
        </div>
      </PopOverContext.Provider>
    </>
  );
};

type PopOverType = React.FC<PopOverProps> & {
  Context: React.FC<ContextProps>;
  Power: React.FC<PowerProps>;
};

const PopOver = PopOverComponent as PopOverType;

const Power: React.FC<PowerProps> = ({ node, label }) => {
  const { handleClick, contextRef } = useContext(PopOverContext)!;

  return(
    <>
      {!!node && node}
      <button ref={contextRef} onClick={handleClick}>{label}</button>
    </>
  )
}

const Context: React.FC<ContextProps> = ({ content }) => {
  const { open, contentRef } = useContext(PopOverContext)!;

  const className = open ? 'children' : 'children-hidden';
  return createPortal(
    <div ref={contentRef} className={className}>{content}</div>,
    document.body
  )
}

PopOver.Context = Context;
PopOver.Power = Power;

export default PopOver