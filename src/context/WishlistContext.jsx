import { createContext, useContext } from 'react';
import { useState, useEffect } from 'react';

// context declaration
export const WishlistContext = createContext();

// custom context provider
export const WishlistProvider = ({ children }) => {
    // Load from localStorage or default to empty array
    const [wishlist, setWishlist] = useState(() => {
        const stored = localStorage.getItem('wishlist');
        return stored ? JSON.parse(stored) : [];
    });

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));

        // show wishlist in console for debugging
        console.log('Wishlist updated:', wishlist);
    }, [wishlist]);

    // Wishlist functions
    const addToWishlist = (slug) => {
        setWishlist(prev => prev.includes(slug) ? prev : [...prev, slug]);
    };

    const removeFromWishlist = (slug) => {
        setWishlist(prev => prev.filter(item => item !== slug));
    };

    const isInWishlist = (slug) => wishlist.includes(slug);

    return (
        <WishlistContext.Provider value={{
            wishlist,
            addToWishlist,
            removeFromWishlist,
            isInWishlist
        }}>
            {children}
        </WishlistContext.Provider>
    );
};

// use context hook
export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
    return context;
};

export default WishlistContext;