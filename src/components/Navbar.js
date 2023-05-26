import {useContext} from 'react';
import {context} from '../store/context';

export default function NavBar() {
    const ctx = useContext(context);
    return (
        <nav className='flex'>
            <h1 className='black'>Omnipotence Shop</h1>
            <button onClick={ctx.handleCartOpen} className='cart flex'>
                <img src='https://www.freeiconspng.com/thumbs/cart-icon/basket-cart-icon-27.png' alt=''/>
                <h2 className='black'>Your Cart</h2>
                <h2 id='length' className='black'>{ctx.getLength()}</h2>
            </button>
        </nav>
    );
}