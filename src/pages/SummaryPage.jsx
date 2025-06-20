import { useCart } from "../context/CartContext";
import { useLocation } from "react-router-dom";

const SummaryPage = () => {
   const { cart = [] } = useCart() || {};
   const location = useLocation();
   const formCheckout = location.state || {};

   const handleConfirmOrder = () => {
      alert("Ordine confermato!");
   };

   if (cart.length === 0) {
      return (
         <div className="container margin-y-details-page">
            <h2>Carrello vuoto</h2>
            <p>Non hai articoli nel carrello.</p>
         </div>
      );
   }

   function totalPrice() {
      return cart.reduce((total, item) => total + item.quantity * 10, 0).toFixed(2);
   }

   return (
      <div className="container margin-y-details-page">
         <h2>Pagina di riepilogo</h2>
         <ul>
            <li>
               <div>
                  <strong>Articoli nel Carrello:</strong>
                  <ul>
                     {cart.map((item, idx) => (
                        <li key={idx}>
                           {item.slug} x {item.quantity}
                        </li>
                     ))}
                  </ul>
               </div>
            </li>
            <li>
               <div>
                  <strong>Informazioni Checkout:</strong>
                  <ul>
                     <li>Nome: {formCheckout.name || ""}</li>
                     <li>Cognome: {formCheckout.surname || ""}</li>
                     <li>Email: {formCheckout.email || ""}</li>
                     <li>Telefono: {formCheckout.phone || ""}</li>
                     <li>Indirizzo: {formCheckout.address || ""}</li>
                     <li>Metodo di pagamento: {"Carta di credito"}</li>
                     <li>Totale: {totalPrice()}€</li>
                     <li>Data di acquisto: {"01/01/2024"}</li>
                     <li>Numero di ordine: {"123456789"}</li>
                     <li>Stato dell'ordine: {"In elaborazione"}</li>
                     <li>Spedizione: {"Standard"}</li>
                  </ul>
                  <div>
                     <button onClick={handleConfirmOrder}>
                        Conferma Ordine
                     </button>
                  </div>            
               </div>
            </li>
         </ul>
      </div>
   );
};

export default SummaryPage;