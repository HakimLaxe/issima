import './Footer.css';

const Footer = ({ numOfProds, prodsCost, shipmentCost, totalCost, onOrderConfirmed }) => {

    const onOrderButtonClick = () => {
        if (prodsCost > 0 && numOfProds > 0)
            onOrderConfirmed()
    }
    return (
        <footer className="App-footer">
            <div className="cost-details">
                <div className="cost-item">Costo articoli: €{prodsCost}</div>
                <div className="cost-item">Spedizioni: €{shipmentCost}</div>
                <div className="cost-item">Totale: €{totalCost}</div>
            </div>
            <div className="order-cart-container">
                <div className="cart-container">
                    <div className="cart-circle">
                        <span className="cart-count">{numOfProds}</span>
                    </div>
                    <img className="cart-icon" src="/images/carrello.png" alt="Carrello" />
                </div>
                <button className="order-button" onClick={() => onOrderButtonClick()}>Ordina</button>
            </div>
        </footer>
    );
}

export default Footer;
