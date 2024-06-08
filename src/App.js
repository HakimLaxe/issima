import './App.css';
import React, { useState, useEffect } from 'react';
import { sendEmail } from './Utility/Mail'
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import DeliveryForm from './Components/DeliveryForm/DeliveryForm';
import ProductList from './Components/ProductList/ProductList';
import { getSubject, getBody } from './Utility/MailUtils';
import { showConfrimWindow } from './Components/ConfirmWindow/ConfirmWindow'
import { displayErrorWindow } from './Components/ErrorWindow/ErrorWindow';
import OrderSummary from './Components/OrderSummary/OrderSummary';

function App() {

  const [products, setProducts] = useState([]);
  const [selectedProds, setSelectedProds] = useState([]);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false)
  const [isMailSent, setIsMailSent] = useState(false)

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
    const firstShipmentPart = selectedProds
      .filter(prod => prod.productType === 'Alimenti' && prod.quantity > 0)
      .length > 0 ? 5.00 : 0.00

    const secondShipmentPart = 
      selectedProds.filter(prod => prod.productType === 'Bevande' && prod.quantity > 0)
      .length > 0 &&
      selectedProds.filter(prod => prod.productType === 'Bevande' && prod.quantity > 0)
      .map( p => p.quantity)
      .reduce( (acc,val) => acc+val,0) < 5
      ? 5.00 : 0.00
    return Math.max(firstShipmentPart, secondShipmentPart)
  }

  const getTotalCost = () => {
    return (parseFloat(getProductsCost()) + parseFloat(getShipmentCost())).toFixed(2)
  }

  const onFormDelivered = (formData) => {

    showConfrimWindow().then(
      res => {
        if (res) {
          let requestBody = {
            subject: getSubject(formData),
            message: getBody(formData, selectedProds, getProductsCost(), getShipmentCost(), getTotalCost())
          }
          sendEmail(requestBody).then(
            sendigEmailResponse => {
              if (sendigEmailResponse) {
                setIsMailSent(true)
              }
              else {
                displayErrorWindow()
              }
            }
          )
        }
      })
  }

  const onOrderConfirmed = () => {
    setIsOrderConfirmed(true)
  }

  const renderPage = () => {
    if (isOrderConfirmed && !isMailSent)
      return deliveryPage()
    else if (!isOrderConfirmed && !isMailSent)
      return productsPage()
    else
      return orderSummaryPage()
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

  const orderSummaryPage = () => {
    return (<OrderSummary
      selectedProds={selectedProds}
      prodsCost={getProductsCost()}
      shipmentCost={getShipmentCost()}
      totalCost={getTotalCost()}
    />
    );
  }

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;
