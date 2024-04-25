import React, { useState } from 'react';
import './ProductItem.css';

const ProductItem = ({ name, price, imagePath }) => {
    const [quantity, setQuantity] = useState(0);

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 0 ? prevQuantity - 1 : 0));
    };

    return (
        <div className={quantity > 0 ? "product-item-selected" : "product-item"}>
            <div className="product-image">
                <img src={imagePath} alt={name} />
            </div>
            <div className="product-info">
                <div className="product-name">{name}</div>
                <div className="quantity-controls">
                    <button onClick={decrementQuantity}>-</button>
                    <span>{quantity}</span>
                    <button onClick={incrementQuantity}>+</button>
                </div>
                <div className="product-cost">€{price.toFixed(2)}</div>
            </div>
        </div>
    );
};

export default ProductItem;
