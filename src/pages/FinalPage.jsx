import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const FinalPage = () => {
    const location = useLocation();
    const formCheckout = location.state && location.state.email ? location.state : {};

    return (
        <div className="final-page-container">
            <h1 className="final-page-title">Order completed!</h1>
            <p className="final-page-message">           
                Thank you for your order.
                <br />
                We have sent a confirmation email to {formCheckout.email || ""}.
                <br />
                Please check your inbox for more details.
                <br />             
            </p>
            <Link to="/">
              <button type='button' className='mb-3 checkout-btn'>Return to Home Page</button>
            </Link>
        </div>
        
    );
};

export default FinalPage;