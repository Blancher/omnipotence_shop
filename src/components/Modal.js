import {useContext} from 'react';
import {CSSTransition} from 'react-transition-group';
import CartCard from './CartCard';
import useInput from '../hooks/useInput';
import {context} from '../store/context';

export default function Modal() {
    const ctx = useContext(context);
    const [firstInput, setFirstInput, firstValid, firstInputClasses, handleFirstChange, handleFirstBlur, handleFirstSubmit, firstInvalid] = useInput('text');
    const [secondInput, setSecondInput, secondValid, secondInputClasses, handleSecondChange, handleSecondBlur, handleSecondSubmit, secondInvalid] = useInput('text');
    const [phoneInput, setPhoneInput, phoneValid, phoneInputClasses, handlePhoneChange, handlePhoneBlur, handlePhoneSubmit, phoneInvalid] = useInput('phone');
    const formValid = firstValid && secondValid && phoneValid;
    const getPrice = () => ctx.itemAmounts.reduce((curVal, item) => curVal + item.price * item.amount, 0);
    const handleSubmit = (e) => {
        e.preventDefault();
        handleFirstSubmit();
        handleSecondSubmit();
        handlePhoneSubmit();
        const submittedData = [];
        ctx.itemAmounts.forEach(item => {
            if (item.amount > 0) {
                submittedData.push({
                    name: item.name,
                    amount: item.amount
                });
            }
        });
        if (formValid) {
            fetch('https://omnipotence-shop-default-rtdb.firebaseio.com/ordered_marvel_items.json', {
                method: 'POST',
                body: JSON.stringify({items: submittedData, user: `${firstInput} ${secondInput}`, phone: phoneInput}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setFirstInput('')
            setSecondInput('');
            setPhoneInput('');
            ctx.getItems();
            ctx.handleOrder();
        }
    };
    return (
        <div id='modal'>
            {ctx.cartBool && (
                <div className='modal-fade-enter-active'>
                    <div id='scroll' component='div'>
                        {ctx.itemAmounts.map((item, i) => (
                            <CSSTransition in={item.amount > 0} mountOnEnter unmountOnExit classNames='item-fade' timeout={200} key={i}>
                                <CartCard {...item} key={i}/>
                            </CSSTransition>
                        ))}
                    </div>
                    <div className='flex'>
                        <h2>Total Amount</h2>
                        <h2>${getPrice()}</h2>
                    </div>
                    <div id='buttons' className='flex'>
                        <h3 className='cart' onClick={ctx.handleCartClose}>Close</h3>
                        {ctx.getLength() > 0 && <h3 className='cart' id='order' onClick={ctx.handleCartClose}>Checkout</h3>}
                    </div>
                </div>
            )}
            {ctx.checkoutBool && (
                <form className='modal-fade-enter-active' onSubmit={handleSubmit}>
                    <div className={firstInputClasses}>
                        <label htmlFor='first'>Enter your first name:</label><br/>
                        <input type='text' className='checkout' placeholder={!firstInvalid ? '' : "First name can't be empty"} id='first' value={firstInput} onChange={handleFirstChange} onBlur={handleFirstBlur}/>
                    </div>
                    <div className={secondInputClasses}>
                        <label htmlFor='second'>Enter your last name:</label><br/>
                        <input type='text' className='checkout' placeholder={!secondInvalid ? '' : "Last name can't be empty"} id='second' value={secondInput} onChange={handleSecondChange} onBlur={handleSecondBlur}/>
                    </div>
                    <div className={phoneInputClasses}>
                        <label htmlFor='phone'>Enter your phone number:</label><br/>
                        <input type='tel' className='checkout' placeholder={!phoneInvalid ? '' : "Phone number must be 10 digits"} id='phone' value={phoneInput} onChange={handlePhoneChange} onBlur={handlePhoneBlur}/>
                    </div>
                    <button className='cart post' onClick={ctx.handleCartOpen}>←← Cart</button>
                    <button className='cart post'>Order</button>
                </form>
            )}
        </div>
    );
}