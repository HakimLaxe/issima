import React, { useState, useEffect, useCallback } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import './ProductList.css';

const ProductList = ({ products, onSelectedProdsChange }) => {
    const [selectedProds, setSelectedProds] = useState([]);
    const [filteredProds, setFilteredProds] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filter, setFilter] = useState('Bevande');

    useEffect(() => {
        onSelectedProdsChange(selectedProds);
    }, [selectedProds, onSelectedProdsChange]);

    useEffect(() => {
        fetch('/data/products.json')
            .then(response => response.json())
            .then(data => setInitialSelectedProds(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    useEffect(() => {
        if (filter != null) {
            let tmpProds = products.filter(p => p.productType === filter);
            setFilteredProds(tmpProds);
            const tmpCategories = tmpProds
                .map( prod => prod.category)
                .filter((value, index, self) => self.indexOf(value) === index);
            setCategories(tmpCategories)
        }
    }, [filter, products]);

    const setInitialSelectedProds = (prodsData) => {
        const initialProds = prodsData.map(prod => ({
            productName: prod.productName,
            cost: prod.cost,
            productType: prod.productType,
            imagePath: prod.imagePath,
            quantity: 0
        }));
        setSelectedProds(initialProds);
    };

    const onChangeQuantity = useCallback((prodName, quantity) => {
        setSelectedProds(prevSelectedProds => {
            const updatedProds = prevSelectedProds.map(prod =>
                prod.productName === prodName ? { ...prod, quantity } : prod
            );
            return updatedProds;
        });
    }, []);

    const renderProducts = () => {
        if (filteredProds.length === 0) {
            return <div>Nessun prodotto disponibile</div>;
        }

        return categories.map( category => (
            <div key={category}>
                <h3 className="subcategory-label">{category}</h3>
                {filteredProds
                    .filter( p => p.category === category)
                    .map( product => (
                        <ProductItem
                        key={product.id}
                        name={product.productName}
                        price={product.cost}
                        imagePath={`images/${product.imagePath}`}
                        quantity={selectedProds.find(p => p.productName === product.productName)?.quantity || 0}
                        onChangeQuantity={onChangeQuantity}
                    />
                    ))
                }
            </div>
        ));
    };

    return (
        <div className="product-list">
            <div className="filter-buttons">
                <button
                    onClick={() => setFilter('Bevande')}
                    className={filter === 'Bevande' ? 'active' : ''}
                >
                    Bevande
                </button>
                <button
                    onClick={() => setFilter('Alimenti')}
                    className={filter === 'Alimenti' ? 'active' : ''}
                >
                    Alimenti
                </button>
            </div>
            {renderProducts()}
        </div>
    );
};

export default ProductList;
