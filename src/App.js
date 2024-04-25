import './App.css';
import React, { useState } from 'react';
import { sendEmail } from './Utility/Mail'
import DeliveryForm from './Components/DeliveryForm/DeliveryForm';

function App() {

  const onFormDelivered = (formData) => {
    sendEmail(formData)
  }

  return (

    <div>
      <DeliveryForm onFormDelivered={onFormDelivered} />
    </div>
  );
}

export default App;
