function getTimestamp() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
}

export function getSubject(formData) {
    return `Ordine ${formData.firstName} ${formData.lastName} del ${getTimestamp()}`
}

export function getBody(formData, prods, prodsCost, shippingCost, totalCost) {

    let deliveryText = `
    Nome: ${formData.firstName}
    Cognome: ${formData.lastName}
    Codice Fiscale: ${formData.fiscalCode}
    Città: ${formData.city}
    Provincia: ${formData.prov}
    CAP: ${formData.CAP}
    Indirizzo: ${formData.address}
    Numero Civico: ${formData.streetNumber}
    Numero di Cellulare: ${formData.phoneNumber}
    Email: ${formData.email}`

    let prodsText = "\n\nNOME PRODOTTO COSTO QUANTITA\n\n"

    for (let prod of prods) {
        if (prod.quantity > 0)
            prodsText += `${prod.productName} ${prod.cost} ${prod.quantity}\n`
    }

    let costsText = `\n\nCOSTO PRODOTTI: ${prodsCost}\n COSTO SPEDIZIONE: ${shippingCost}\nCOSTO TOTALE: ${totalCost}`

    return deliveryText + prodsText + costsText
}