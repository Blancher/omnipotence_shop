import React, {useState, useEffect} from 'react';

export const context = React.createContext({
    itemAmounts: [],
    cartBool: false,
    checkoutBool: false,
    message: '',
    displayModal: false,
    getLength: () => {},
    setDisplay: () => {},
    handleAdd: () => {},
    handleCartOpen: () => {},
    handleCartClose: () => {},
    getItems: () => {},
    handleOrder: () => {}
});

export function ContextProvider(props) {
    const [itemAmounts, setItemAmounts] = useState(JSON.parse(localStorage.getItem('items')) || []);
    const [cartBool, setCartBool] = useState(false);
    const [checkoutBool, setCheckoutBool] = useState(false);
    const [displayModal, setDisplayModal] = useState(false);
    useEffect(() => {
      if (itemAmounts.length === 0) {
        getItems();
      }
    }, []);
    useEffect(() => localStorage.setItem('items', JSON.stringify(itemAmounts)), [itemAmounts]);
    const getItems = async() => {
      const response = await fetch('https://omnipotence-shop-default-rtdb.firebaseio.com/marvel_items.json');
      const results = await response.json();
      const stateResults = [];
      for (const item in results) {
        results[item].forEach(subItem => stateResults.push(subItem));
      }
      setItemAmounts(stateResults);
    };
    const handleAdd = input => setItemAmounts(prev => prev.map(item => item.name === input.name ? {...item, amount: item.amount + input.amount} : item));
    const handleCartOpen = () => {
      setDisplayModal(true);
      setCartBool(true);
      setCheckoutBool(false);
    };
    const handleCartClose = (e) => {
      if (e.target.id === 'order') {
        setCartBool(false);
        setCheckoutBool(true);
      } else {
        setDisplayModal(false);
      }
    };
    const handleOrder = () => setDisplayModal(false);
    const getLength = () => itemAmounts.reduce((curVal, item) => curVal + item.amount, 0);
    return (
        <context.Provider value={{itemAmounts: itemAmounts, cartBool: cartBool, checkoutBool: checkoutBool, displayModal: displayModal, getLength: getLength, handleAdd: handleAdd, handleCartOpen: handleCartOpen, handleCartClose: handleCartClose, getItems: getItems, handleOrder: handleOrder}}>
          {props.children}
        </context.Provider>
    );
}