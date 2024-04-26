import './App.css';
import React, { useState, useEffect } from 'react';
import { sendEmail } from './Utility/Mail'
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import DeliveryForm from './Components/DeliveryForm/DeliveryForm';
import ProductList from './Components/ProductList/ProductList';

function App() {

  const [products, setProducts] = useState([]);
  const [selectedProds, setSelectedProds] = useState([]);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false)

  useEffect(() => {
    fetch('/data/products.json')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const onSelectedProdsChange = (updatedProds) => {
    setSelectedProds(updatedProds)
  }

  const getNumberOfSelectedProds = () => {
    return selectedProds
      .map(prod => prod.quantity)
      .reduce((acc, val) => acc + val, 0)
  }

  const getProductsCost = () => {
    return selectedProds
      .map(prod => prod.cost * prod.quantity)
      .reduce((acc, val) => acc + val, 0)
      .toFixed(2)
  }

  const getShipmentCost = () => {
    return selectedProds
      .filter(prod => prod.productType === 'Cibo' && prod.quantity > 0)
      .length > 0 ? 5.00 : 0.00
  }

  const getTotalCost = () => {
    return (parseFloat(getProductsCost()) + parseFloat(getShipmentCost())).toFixed(2)
  }

  const onFormDelivered = (formData) => {
    sendEmail(formData)
  }

  const onOrderConfirmed = () => {
    setIsOrderConfirmed(true)
  }

  const renderPage = () => {
    if (isOrderConfirmed)
      return deliveryPage()
    return productsPage()
  }

  const productsPage = () => {
    return (<>
      <Header />
      <ProductList products={products} onSelectedProdsChange={onSelectedProdsChange} />
      <Footer
        numOfProds={getNumberOfSelectedProds()}
        prodsCost={getProductsCost()}
        shipmentCost={getShipmentCost()}
        totalCost={getTotalCost()}
        onOrderConfirmed={onOrderConfirmed}
      />
    </>);
  }

  const deliveryPage = () => {
    return (<DeliveryForm onFormDelivered={onFormDelivered} />);
  }

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;
