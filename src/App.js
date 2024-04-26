import './App.css';
import React, { useState, useEffect } from 'react';
import { sendEmail } from './Utility/Mail'
import Header from './Components/Header/Header';
import DeliveryForm from './Components/DeliveryForm/DeliveryForm';
import ProductList from './Components/ProductList/ProductList';

function App() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/data/products.json')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const onFormDelivered = (formData) => {
    sendEmail(formData)
  }

  return (
    <div className="App">
      <Header />
      <ProductList products={products} />
      <footer className="App-footer">
        <div className="cost-details">
          <div className="cost-item">Costo articoli: €18.40</div>
          <div className="cost-item">Spedizioni: €5.20</div>
          <div className="cost-item">Totale: €23.60</div>
        </div>
        <div className="order-cart-container">
          <div className="cart-container">
            <div className="cart-circle">
              <span className="cart-count">3</span>
            </div>
            <img className="cart-icon" src="/images/carrello.png" alt="Carrello" />
          </div>
          <button className="order-button">Ordina</button>
        </div>
      </footer>

      {/*<DeliveryForm onFormDelivered={onFormDelivered} />*/}
    </div>
  );
}

export default App;
