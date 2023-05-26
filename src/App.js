import {useContext} from 'react';
import {CSSTransition} from 'react-transition-group';
import Navbar from './components/Navbar';
import About from './components/About';
import Background from './components/Background';
import Modal from './components/Modal';
import List from './components/List';
import {context} from './store/context';

export default function App() {
  const ctx = useContext(context);
  return (
    <>
      <CSSTransition in={ctx.displayModal} mountOnEnter unmountOnExit classNames='bg-fade' timeout={200}>
        <Background/>
      </CSSTransition>
      <CSSTransition in={ctx.displayModal} mountOnEnter unmountOnExit classNames='modal-fade' timeout={200}>
        <Modal/>
      </CSSTransition>
      <Navbar/>
      <About/>
      <List/>
    </>
  );
}