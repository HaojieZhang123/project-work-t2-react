import { createContext, useContext } from 'react';
import { useState, useEffect } from 'react';

// context declaration
export const CartContext = createContext();

// custom context provider
export const CartProvider = ({ children }) => {
    // Load from localStorage or default to empty array
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem('cart');
        return stored ? JSON.parse(stored) : [];
    });

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Cart functions
    const addToCart = (slug, quantity = 1) => {
        setCart(prev => {
            const existing = prev.find(item => item.slug === slug);
            if (existing) {
                return prev.map(item =>
                    item.slug === slug
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { slug, quantity }];
        });
    };

    const removeFromCart = (slug) => {
        setCart(prev => prev.filter(item => item.slug !== slug));
    };

    const updateCartQuantity = (slug, quantity) => {
        setCart(prev =>
            prev.map(item =>
                item.slug === slug ? { ...item, quantity } : item
            )
        );
    };

    const isInCart = (slug) => cart.some(item => item.slug === slug);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateCartQuantity,
            isInCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

// use context hook
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};

export default CartContext;