import { useParams } from 'react-router-dom';
import products from '../data/products';
import { Link } from 'react-router-dom';

const DetailsPage = () => {
    const { id } = useParams();
    const product = products.find(p => p.id === id);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="container mt-5">
            <h2>{product.product_name}</h2>
            <img src={product.image} alt={product.product_name} />
            <p >{product.description}</p>
            <h3>Pice: €{product.price}</h3>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Brand:</strong> {product.brand_id}</p>
            <Link to="/">
                <button className="btn btn-primary">Return to home</button>
            </Link>
        </div>
    );
};

export default DetailsPage;