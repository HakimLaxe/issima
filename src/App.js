import './App.css';
import React, { useState, useEffect } from 'react';
import { sendEmail } from './Utility/Mail'
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
      <header className="App-header">
        <img src='./images/logo.png'></img>
      </header>
      <ProductList products={products} />
      <footer className="App-footer">
        <p>Footer content here</p>
      </footer>
      {/*<DeliveryForm onFormDelivered={onFormDelivered} />*/}
    </div>
  );
}

export default App;
