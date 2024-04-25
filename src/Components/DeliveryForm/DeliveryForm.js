import React, { useState } from 'react';
import { FaUser, FaUserTie, FaBarcode, FaCity, FaRegAddressCard } from "react-icons/fa";
import { PiNumberFourFill } from "react-icons/pi";
import { GiVillage } from "react-icons/gi";
import { IoIosPhonePortrait } from "react-icons/io";
import { MdMarkEmailRead } from "react-icons/md";
import { PiCodesandboxLogo } from "react-icons/pi";
import './DeliveryForm.css'

const DeliveryForm = ({ onFormDelivered }) => {
    // Stati per memorizzare i valori del form
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        CAP: '',
        prov: '',
        fiscalCode: '',
        phoneNumber: '',
        email: ''
    });

    // Gestisce la modifica dei campi del form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Gestisce l'invio del form
    const handleSubmit = (e) => {
        e.preventDefault();
        onFormDelivered(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div class="input-container">
                <label>
                    Nome
                </label>
                <div className="input-row">
                    <div className='icon'>
                        <FaUser />
                    </div>
                    <input
                        class="input-field"
                        type="text"
                        placeholder="Mario"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>

            <div class="input-container">
                <label>
                    Cognome
                </label>
                <div className="input-row">
                    <div className='icon'>
                        <FaUserTie />
                    </div>
                    <input
                        class="input-field"
                        type="text"
                        placeholder="Rossi"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div class="input-container">
                    <label>
                        Codice Fiscale
                    </label>
                    <div className="input-row">
                        <div className='icon'>
                            <FaBarcode />
                        </div>
                        <input
                            class="input-field"
                            type="text"
                            placeholder="DNTCRL65S67M126L"
                            name="fiscalCode"
                            pattern="[A-Za-z]{6}\d{2}[A-Za-z]\d{2}[A-Za-z]\d{3}[A-Za-z]"
                            value={formData.fiscalCode}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div class="input-container">
                    <label>
                        Città
                    </label>
                    <div className="input-row">
                        <div className='icon'>
                            <GiVillage />
                        </div>
                        <input
                            class="input-field"
                            type="text"
                            placeholder="Ortucchio"
                            name="city"
                            pattern="[A-Za-zÀ-ÿ\s'-]{1,50}"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                </div>

                <div class="input-container">
                    <label>
                        Provincia
                    </label>
                    <div className="input-row">
                        <div className='icon'>
                            <FaCity />
                        </div>
                        <input
                            class="input-field"
                            type="text"
                            placeholder="AQ"
                            name="prov"
                            pattern="[A-Za-z]{2}"
                            value={formData.prov}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div class="input-container">
                    <label>
                        CAP
                    </label>
                    <div className="input-row">
                        <div className='icon'>
                            <PiCodesandboxLogo />
                        </div>
                        <input
                            class="input-field"
                            type="text"
                            placeholder="67050"
                            name="CAP"
                            value={formData.CAP}
                            pattern="[0-9]{5}"
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div class="input-container">
                    <label>
                        Indirizzo
                    </label>
                    <div className="input-row">
                        <div className='icon'>
                            <FaRegAddressCard />
                        </div>
                        <input
                            class="input-field"
                            type="text"
                            placeholder="Via Monti"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div class="input-container">
                    <label>
                        Numero Civico
                    </label>
                    <div className="input-row">
                        <div className='icon'>
                            <PiNumberFourFill />
                        </div>
                        <input
                            class="input-field"
                            type="text"
                            placeholder="4"
                            name="streetNumber"
                            value={formData.streetNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div class="input-container">
                    <label>
                        Numero di Cellulare
                    </label>
                    <div className="input-row">
                        <div className='icon'>
                            <IoIosPhonePortrait />
                        </div>
                        <input
                            class="input-field"
                            type="text"
                            placeholder="3274028199"
                            name="phoneNumber"
                            pattern="[0-9]{10}"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div class="input-container">
                    <label>
                        Email (facoltativo)
                    </label>
                    <div className="input-row">
                        <div className='icon'>
                            <MdMarkEmailRead />
                        </div>
                        <input
                            class="input-field"
                            type="text"
                            placeholder="MarioRossi@mail.com"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

            </div>



            <button type="submit" class="btn">Conferma</button>
        </form>
    );
};

export default DeliveryForm;
