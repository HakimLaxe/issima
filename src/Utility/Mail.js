import emailjs from '@emailjs/browser';

export function sendEmail(inputValues) {

    emailjs.init("0NCgt3HVTTudBnrEk")
    return new Promise((resolve, reject) => {
        emailjs.send('service_pkk9cgo', 'template_ztwsph6', inputValues, '0NCgt3HVTTudBnrEk')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                resolve(true)
            }, (error) => {
                console.log('FAILED...', error);
                resolve(false)
            });
    })

};