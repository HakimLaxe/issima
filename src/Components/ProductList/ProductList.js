import React from 'react';
import ProductItem from '../ProductItem/ProductItem';
import './ProductList.css';

const ProductList = ({ products }) => {

    const renderProducts = () => {
        if (products === []) {
            return null;
        }
        return products.map(product => (
            <ProductItem
                key={product.id}
                name={product.productName}
                price={product.cost}
                imagePath={`images/${product.imagePath}`}
            />
        ))
    }

    return (
        <div className="product-list">
            {renderProducts()}
        </div>
    );
};

export default ProductList;
