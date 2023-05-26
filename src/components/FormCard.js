import {useState, useContext} from 'react';
import {CSSTransition} from 'react-transition-group';
import {context} from '../store/context';

export default function FormCard(props) {
    const ctx = useContext(context);
    const [num, setNum] = useState(1);
    const handleChange = (e) => setNum(Math.abs(+e.target.value));
    return (
        <>
            <div className={`flex card ${props.index === 0 ? 'margin' : ''}`}>
                <CSSTransition in={props.amount > 0} mountOnEnter unmountOnExit classNames='modal-fade' timeout={200}>
                    <p id='contained'>In Cart</p>
                </CSSTransition>
                <div>
                    <h3>{props.name}</h3>
                    <p>{props.description}</p>
                    <h3>${props.price}</h3>
                </div>
                <div>
                    <label htmlFor='num'>Amount</label>
                    <input onChange={handleChange} defaultValue={1} type='number' id='num' min="0"/>
                    <br/>
                    <button className='cart post' onClick={() => ctx.handleAdd({name: props.name, amount: num})}>+ Add to Cart</button>
                </div>
            </div>
            <hr className={props.index === 5 ? 'bottom' : ''}/>
        </>
    );
}