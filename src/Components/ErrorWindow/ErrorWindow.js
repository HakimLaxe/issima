import Swal from 'sweetalert2';

export function displayErrorWindow() {
    Swal.fire({
        icon: "error",
        title: "Errore nella conferma dell'ordine",
        text: "Prova a rifare l'ordine, ci scusiamo per il problema"
    });
}