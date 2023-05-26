import {useContext} from 'react';
import {context} from '../store/context';

export default function CartCard(props) {
    const ctx = useContext(context);
    return (
        <div className='orders flex'>
            <div>
                <h3>{props.name}</h3>
                <div className='flex stats'>
                    <p>${props.price}</p>
                    <p>x{props.amount}</p>
                </div>
            </div>
            <div className='flex'>
                <h2 className='add' onClick={() => ctx.handleAdd({name: props.name, amount: -props.amount})}>🗑️</h2>
                <h2 className='add' onClick={() => ctx.handleAdd({name: props.name, amount: -1})}>-</h2>
                <h2 className='add' onClick={() => ctx.handleAdd({name: props.name, amount: 1})}>+</h2>
            </div>
        </div>
    );
}