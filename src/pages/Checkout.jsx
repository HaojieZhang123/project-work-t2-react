import React from 'react'

const Checkout = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h1>Inserisci i tuoi dati.</h1>
                    <form>
                        Attenzione!Tutti i campi sono obbligatori.
                        <div>
                            <label htmlFor="name">Name </label>
                            <input type="text"
                                name="name"
                                placeholder='Inserisci il tuo nome' required
                            />
                        </div>
                        <div>
                            <label htmlFor="name">Surname </label>
                            <input type="text"
                                name="surname"
                                placeholder='Inserisci il tuo cognome' required
                            />
                        </div>
                        <div>
                            <label htmlFor="name">Email </label>
                            <input type="email"
                                name="email"
                                placeholder='Inserisci la tua e-mail' required
                            />
                        </div>
                        <div>
                            <label htmlFor="name">Phone </label>
                            <input type="tel"
                                name="phone"
                                placeholder='Inserisci il tuo numero di telefono' required
                            />
                        </div>
                        <div>
                            <label htmlFor="name">Address </label>
                            <input type="text"
                                name="address"
                                placeholder='Inserisci il tuo indirizzo' required
                            />
                        </div>
                        <div>
                            <label htmlFor="name">Codice Promozionale </label>
                            <input type="text"
                                name="Codice Promozionale"
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