import React, { useEffect, useState } from 'react';
import './ProductItem.css';

const ProductItem = ({ name, price, imagePath, onChangeQuantity }) => {
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        onChangeQuantity(name, quantity)
    }, [quantity, setQuantity, name])

    const changeQuantity = (value) => {
        setQuantity(prevQuantity => prevQuantity + value < 0 ? 0 : prevQuantity + value);
    };


    return (
        <div className={quantity > 0 ? "product-item-selected" : "product-item"}>
            <div className="product-image">
                <img src={imagePath} alt={name} />
            </div>
            <div className="product-info">
                <div className="product-name">{name}</div>
                <div className="quantity-controls">
                    <button onClick={() => changeQuantity(-1)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => changeQuantity(1)}>+</button>
                </div>
                <div className="product-cost">€{price.toFixed(2)}</div>
            </div>
        </div>
    );
};

export default ProductItem;
