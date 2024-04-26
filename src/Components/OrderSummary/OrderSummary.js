import { React, useEffect } from 'react';
import { displaySuccessWindow } from '../SuccessWindow/SuccessWindow';
import './OrderSummary.css';

const OrderSummary = ({ selectedProds, prodsCost, shipmentCost, totalCost }) => {

    useEffect(() => {
        displaySuccessWindow()
    }, [])

    return (
        <table>
            <thead>
                <tr>
                    <th>NOME PRODOTTO</th>
                    <th>COSTO PER UNITA'</th>
                    <th>QUANTITA'</th>
                </tr>
            </thead>
            <tbody>
                {selectedProds.map(prod => (
                    <tr key={prod.id}>
                        <td>{prod.productName}</td>
                        <td>{prod.cost}</td>
                        <td>{prod.quantity}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <th>COSTO ARTICOLI</th>
                    <th>COSTO SPEDIZIONE</th>
                    <th>COSTO TOTALE</th>
                </tr>
                <tr>
                    <td>{prodsCost}</td>
                    <td>{shipmentCost}</td>
                    <td>{totalCost}</td>
                </tr>
            </tfoot>
        </table>
    );
}

export default OrderSummary;