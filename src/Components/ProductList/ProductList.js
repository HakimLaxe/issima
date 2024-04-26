import { React, useState, useEffect } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import './ProductList.css';

const ProductList = ({ products, onSelectedProdsChange }) => {

    const [selectedProds, setSelectedProds] = useState([]);

    useEffect(() => {
        onSelectedProdsChange(selectedProds)
    }, [selectedProds, onSelectedProdsChange])

    useEffect(() => {
        fetch('/data/products.json')
            .then(response => response.json())
            .then(data => setInitialSelectedProds(data))
            .catch(error => console.error('Error fetching products:', error));
    }, [])

    const setInitialSelectedProds = (prodsData) => {
        let initialProds = []
        prodsData.map(prod =>
            initialProds.push({ productName: prod.productName, cost: prod.cost, productType: prod.productType, quantity: 0 })
        )
        setSelectedProds(initialProds)
    }

    const onChangeQuantity = (prodName, quantity) => {
        let tmpProds = [...selectedProds]
        for (let prod of tmpProds)
            if (prod.productName === prodName)
                prod.quantity = quantity
        setSelectedProds(tmpProds)
    }

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
                onChangeQuantity={onChangeQuantity}
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
