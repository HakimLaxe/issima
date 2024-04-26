import emailjs from '@emailjs/browser';

export function sendEmail(inputValues) {

    const initSeed = process.env.REACT_APP_INIT_SEED;
    const serviceId = process.env.REACT_APP_SERVICE_ID;
    const templateId = process.env.REACT_APP_TEMPLATE_ID;

    emailjs.init(initSeed)
    return new Promise((resolve, reject) => {
        emailjs.send(serviceId, templateId, inputValues, initSeed)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                resolve(true)
            }, (error) => {
                console.log('FAILED...', error);
                resolve(false)
            });
    })

};