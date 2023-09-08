import ProductCard from '../product-card/product-card.component';
import './category-preview.style.scss';
import { Link } from 'react-router-dom';

const CategoryPreview = ({ title, products }) => {
    
    return (
      <div className="category-preview-container">
        <h2>
            <Link className="title" to={title} > {title.toUpperCase()} </Link>
        </h2>
        <div className="preview">
            {
                products.filter((_, idx) => idx < 4).map((products) => 
                    <ProductCard key={products.id} product={products} />
                )
            }
        </div>
      </div>  
    );
}

export default CategoryPreview; 