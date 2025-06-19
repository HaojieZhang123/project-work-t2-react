import React, { useState } from 'react';

const initialCart = [
    { id: 1, name: 'Prodotto 1', price: 10, quantity: 1 },
    { id: 2, name: 'Prodotto 2', price: 20, quantity: 2 },
];

const PROMOCODES = {
    SCONTO10: 0.1, // 10% discount
    SCONTO20: 0.2, // 20% discount
};

const Cart = () => {
    const [cart, setCart] = useState(initialCart);
    const [promocode, setPromocode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [promoMessage, setPromoMessage] = useState('');
    const [checkoutMessage, setCheckoutMessage] = useState('');

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const getTotal = () => {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return (total * (1 - discount)).toFixed(2);
    };

    const handleApplyPromocode = () => {
        const code = promocode.trim().toUpperCase();
        if (PROMOCODES[code]) {
            setDiscount(PROMOCODES[code]);
            setPromoMessage(`Codice promozionale applicato: -${PROMOCODES[code] * 100}%`);
        } else {
            setDiscount(0);
            setPromoMessage('Codice promozionale non valido.');
        }
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            setCheckoutMessage('Il carrello è vuoto.');
        } else {
            setCheckoutMessage('Checkout effettuato con successo!');
            setCart([]);
            setDiscount(0);
            setPromocode('');
            setPromoMessage('');
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h4>Your Cart</h4>
                    {cart.length === 0 ? (
                        <h6>Cart is empty</h6>
                    ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>€ {item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>€ {item.price * item.quantity}</td>
                                        <td>
                                            <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>
                                                Rimuovi
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control d-inline-block w-auto"
                            placeholder="Inserisci codice promozionale"
                            value={promocode}
                            onChange={e => setPromocode(e.target.value)}
                            disabled={cart.length === 0}
                        />
                        <button
                            className="btn btn-primary ms-2"
                            onClick={handleApplyPromocode}
                            disabled={cart.length === 0}
                        >
                            Applica
                        </button>
                        {promoMessage && (
                            <div className="mt-2">
                                <small>{promoMessage}</small>
                            </div>
                        )}
                    </div>
                    <h5>Totale: € {getTotal()}</h5>
                    <button
                        className="btn btn-success mt-3 mb-3"
                        onClick={handleCheckout}
                        disabled={cart.length === 0}
                    >
                        Checkout
                    </button>
                    {checkoutMessage && (
                        <div className="mt-3">
                            <strong>{checkoutMessage}</strong>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;