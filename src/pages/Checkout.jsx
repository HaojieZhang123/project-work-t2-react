import { createContext, useContext } from 'react';
import { useState, useEffect } from 'react';

const Checkout = () => {



    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <h1>Inserisci i tuoi dati.</h1>
                    <form className='row g-3'>
                        <div className='col-md-6'>
                            <label htmlFor="name">Name* </label>
                            <input type="text"
                                name="name"
                                placeholder='Inserisci il tuo nome' required
                            />
                        </div>
                        <div className='col-md-6'>
                            <label htmlFor="surname">Surname* </label>
                            <input type="text"
                                name="surname"
                                placeholder='Inserisci il tuo cognome' required
                            />
                        </div>
                        <div className='col-md-8'>
                            <label htmlFor="email">Email* </label>
                            <input type="email"
                                name="email"
                                placeholder='Inserisci la tua e-mail' required
                            />
                        </div>
                        <div className='col-md-4'>
                            <label htmlFor="phone">Phone* </label>
                            <input type="number"
                                name="phone"
                                placeholder='Inserisci il tuo numero di telefono' required
                            />
                        </div>
                        <div>
                            <label htmlFor="address">Address* </label>
                            <input type="text"
                                name="address"
                                placeholder='Inserisci il tuo indirizzo' required
                            />
                        </div>
                        <div>
                            <label htmlFor="promo">Codice Promozionale </label>
                            <input type="text"
                                name="promo"
                                placeholder='Inserisci il tuo codice promozionale'
                            />
                        </div>
                        <button type='submit'>Continua</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Checkout