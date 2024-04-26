import Swal from 'sweetalert2';

export function displaySuccessWindow() {
    Swal.fire({
        icon: 'success',
        title: 'Ordine Confermato correttamente',
        text: "Grazie per il tuo Ordine!",
    });
}