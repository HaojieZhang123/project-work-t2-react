import { useCart } from "../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductRow from "../components/ProductRow";

const SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 5;

const SummaryPage = () => {
   const [productRowsState, setProductRowsState] = useState(3) // 1 for wishlist, 2 for cart, 3 for summary

   const { cart = [], appliedPromo, setAppliedPromo, setCart } = useCart() || {};
   const location = useLocation();
   const navigate = useNavigate();
   const formCheckout = location.state || {};

   const today = new Date();
   const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;

   const [productsDetails, setProductsDetails] = useState([]);
   const [loading, setLoading] = useState(true);
   const [confirming, setConfirming] = useState(false);

   useEffect(() => {
      if (cart.length === 0) return;
      axios.get("http://localhost:3000/api/products")
         .then(res => {
            setProductsDetails(res.data);
            setLoading(false);
         });
   }, [cart]);

   const getProductDetail = (slug) => {
      return productsDetails.find(p => p.slug === slug) || {};
   }

   const fullSubtotal = () => {
      return cart.reduce((total, item) => {
         const p = getProductDetail(item.slug);
         return total + (parseFloat(p.price) || 0) * item.quantity;
      }, 0);
   }

   const productDiscountTotal = () => {
      return cart.reduce((total, item) => {
         const p = getProductDetail(item.slug);
         return total + ((parseFloat(p.price) || 0) * (parseFloat(p.discount) || 0) / 100) * item.quantity;
      }, 0);
   }

   const promoDiscount = () => {
      return appliedPromo ? (subtotalAfterDiscount() * (appliedPromo.discount || 0) / 100) : 0;
   }

   const subtotalAfterDiscount = () => {
      return fullSubtotal() - productDiscountTotal();
   }

   const subtotalAfterPromo = () => {
      return subtotalAfterDiscount() - promoDiscount();
   }

   const shipping = () => {
      return subtotalAfterPromo() >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
   }

   const total = () => {
      return subtotalAfterPromo() + shipping();
   }

   const handleConfirmOrder = async () => {
      setConfirming(true);
      try {
         const products = cart.map(item => {
            const detail = getProductDetail(item.slug);
            return {
               product_id: detail.id,
               quantity: item.quantity
            };
         });

         let promoCodeId = null;
         if (appliedPromo && appliedPromo.code) {
            promoCodeId = appliedPromo.id;
         }

         const orderData = {
            name: formCheckout.name,
            surname: formCheckout.surname,
            email: formCheckout.email,
            phone: formCheckout.phone,
            address: formCheckout.address,
            promoCodeId: promoCodeId,
            shippingCost: shipping(),
            products
         };

         await axios.post("http://localhost:3000/api/orders/withproducts", orderData);
         await axios.post("http://localhost:3000/api/send", orderData);

         // reset cart
         setCart([]);
         setAppliedPromo(null);

         navigate("/final", { state: { email: formCheckout.email } });
      } catch (err) {
         alert("There was an error confirming the order!");
         console.error(err);
      } finally {
         setConfirming(false);
      }

   };

   if (loading) return <div><span className="loader"></span></div>;
   if (cart.length === 0) {
      return (
         <div className="container margin-y-details-page">
            <h2>Empty Cart</h2>
            <p>Your cart is empty</p>
         </div>
      );
   }

   const products = cart.map(item => {
      const detail = getProductDetail(item.slug);
      return detail;
   });

   console.log(products)

   return (
      <div className="container margin-y-details-page summary-container p-5">
         <h2 className="cart-title summary-title">Order Summary</h2>
         <div className="summary-layout d-flex justify-content-between">
            <div className="summary-section summary-order">
               <h4 className="summary-section-title">Ordered products</h4>
               <ul className="summary-list">
                  {cart.map((item, idx) => {
                     const detail = getProductDetail(item.slug);
                     return (
                        <ProductRow key={item.slug} state={productRowsState} product={detail} />
                     )
                  })
                  }
               </ul>
            </div>
            <div className="summary-section summary-customer">
               <h4 className="summary-section-title">Your informations</h4>
               <ul className="summary-list">
                  <li><strong>First name:</strong> {formCheckout.name || ""}</li>
                  <li><strong>Last name:</strong> {formCheckout.surname || ""}</li>
                  <li><strong>Email:</strong> {formCheckout.email || ""}</li>
                  <li><strong>Phone number:</strong> {formCheckout.phone || ""}</li>
                  <li><strong>Address:</strong> {formCheckout.address || ""}</li>
                  <li><strong>Payment Method:</strong> Credit Card</li>
                  <li><strong>Current date:</strong> {formattedDate}</li>
               </ul>
            </div>
         </div>
         <div className="summary-section summary-total">
            <h4 className="summary-section-title">Totals</h4>
            <div className="summary-row">
               <span>Subtotal</span>
               <span>{fullSubtotal().toFixed(2)} €</span>
            </div>
            <div className="summary-row">
               <span>Products discounts</span>
               <span>-{productDiscountTotal().toFixed(2)} €</span>
            </div>
            {appliedPromo && (
               <div className="summary-row">
                  <span>Promo code discount ({appliedPromo.code})</span>
                  <span>-{promoDiscount().toFixed(2)} €</span>
               </div>
            )}
            <div className="summary-row">
               <span>Shipping</span>
               <span>{shipping() === 0 ? "FREE" : `€${shipping().toFixed(2)}`}</span>
            </div>
            <div className="summary-total-row">
               <span>Total</span>
               <span>{total().toFixed(2)} €</span>
            </div>
         </div>
         <div className="summary-btn-row">
            <button
               className="checkout-btn summary-confirm-btn"
               onClick={handleConfirmOrder}
               disabled={confirming}
               style={confirming ? { pointerEvents: "none", opacity: 0.7 } : {}}
            >
               {confirming ? <span className="loader-summary"></span> : "Confirm order"}
            </button>
         </div>
      </div>
   );
};

export default SummaryPage;