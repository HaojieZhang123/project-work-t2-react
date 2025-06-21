import { useCart } from '../context/CartContext';

const CardsList = ({ product }) => {

    const { slug, image, brand_name, product_name, category_name, price, discount, added_date } = product;

    // context
    const {
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        isInCart
    } = useCart();

    // Calculate the actual price after discount
    const discountValue = (price * discount) / 100;
    const actualPrice = (price - discountValue).toFixed(2);

    // Calcolo se il prodotto è "new"
    const today = new Date();
    const addedDate = new Date(added_date);
    const diffTime = today - addedDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    const isNew = diffDays <= 28 && diffDays >= 0;

    // Calcolo se il prodotto è "promo"
    const isPromo = discount > 0;

    // add product to cart. if already in cart, increase quantity by 1
    const addCartButtonHandler = (slug) => {
        if (isInCart(slug)) {
            // get the current quantity and increase it by 1
            const currentQuantity = cart.find(item => item.slug === slug)?.quantity || 0;
            // update the cart quantity
            updateCartQuantity(slug, currentQuantity + 1);
        } else {
            addToCart(slug, 1);
        }
    };


    return (
        <>
            <div className="card-list">
                <div className="card-list-img">
                    <img src={image} alt={product_name} />
                </div>

                <div className="card-list-info color-main">
                    <div className="card-brand color-main-subtle">{brand_name}</div>
                    <div className="card-product-name">{product_name}</div>
                    <div className="card-category color-main-subtle">{category_name}</div>
                    <div className="card-list-bottom">
                        {isPromo && <span className="card-tag tag-promo">promo</span>}
                        {isNew && <span className="card-tag tag-new">new</span>}
                        <div className="card-original-price color-main-subtle ms-4">{`€ ${price}`}</div>
                        <div className="card-price ms-2">{`€ ${actualPrice}`}</div>
                    </div>
                </div>

                <div className="card-list-cta">
                    <div className="card-add-to-cart color-main" onClick={() => addCartButtonHandler(product.slug)}>
                        <span>Add to Cart {isInCart(product.slug) ? `(${cart.find(item => item.slug === product.slug)?.quantity}) ` : ' '}</span>
                    </div>
                </div>
            </div>

            <div className="product-row-separator"></div>
        </>
    )
}

export default CardsList