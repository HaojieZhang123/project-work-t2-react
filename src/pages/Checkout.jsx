import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Checkout = () => {
    // Dummy handleSubmit to prevent errors; replace with your logic if needed
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your submit logic here
    };


    const [formCheckout, setFormCheckout] = useState({
        name: '',
        surname: '',
        email: '',
        phone: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormCheckout(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <h1>Insert your data</h1>
                    <form className='row g-3' onSubmit={handleSubmit}>
                        <div className='col-md-6'>
                            <label htmlFor="name">Name* </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder='Insert your name'
                                required
                                value={formCheckout.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='col-md-6'>
                            <label htmlFor="surname">Surname* </label>
                            <input
                                type="text"
                                id="surname"
                                name="surname"
                                placeholder='Insert your surname'
                                required
                                value={formCheckout.surname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='col-md-8'>
                            <label htmlFor="email">Email* </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder='Insert your e-mail'
                                required
                                value={formCheckout.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='col-md-4'>
                            <label htmlFor="phone">Phone* </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder='Insert your telephone number'
                                required
                                value={formCheckout.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="address">Address* </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                placeholder='Insert your address'
                                required
                                value={formCheckout.address}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='d-flex justify-content-between' >
                            <Link
                                to={{
                                    pathname: "/cart",
                                    state: { formCheckout }
                                }}
                                state={formCheckout}
                            >
                                <button type='button' className='mb-3'><i class="fa-solid fa-arrow-left"></i> Back to Cart</button>
                            </Link>
                            <Link
                                to={{
                                    pathname: "/summary",
                                    state: { formCheckout }
                                }}
                                state={formCheckout}
                            >
                                <button type='button' className='mb-3'>Next Step <i class="fa-solid fa-arrow-right"></i></button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Checkout

