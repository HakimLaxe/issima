import React, { useEffect, useState } from 'react';
import './ProductItem.css';

const ProductItem = ({ name, price, imagePath, quantity, onChangeQuantity }) => {
    const [localQuantity, setLocalQuantity] = useState(quantity);

    useEffect(() => {
        if (localQuantity !== quantity) {
            onChangeQuantity(name, localQuantity);
        }
    }, [localQuantity, name, onChangeQuantity, quantity]);

    useEffect(() => {
        setLocalQuantity(quantity); // Sincronizzare localQuantity con la quantità passata come prop
    }, [quantity]);

    const changeQuantity = (value) => {
        setLocalQuantity(prevQuantity => Math.max(0, prevQuantity + value));
    };

    return (
        <div className={localQuantity > 0 ? "product-item-selected" : "product-item"}>
            <div className="product-image">
                <img src={imagePath} alt={name} />
            </div>
            <div className="product-info">
                <div className="product-name">{name}</div>
                <div className="quantity-controls">
                    <button onClick={() => changeQuantity(-1)}>-</button>
                    <span>{localQuantity}</span>
                    <button onClick={() => changeQuantity(1)}>+</button>
                </div>
                <div className="product-cost">€{price.toFixed(2)}</div>
            </div>
        </div>
    );
};

export default ProductItem;
