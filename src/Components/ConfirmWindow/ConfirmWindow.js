import Swal from 'sweetalert2';

export function showConfrimWindow() {
    return new Promise((resolve, reject) => {
        Swal.fire({
            title: "Vuoi Confermare l'ordine",
            text: "Premi Conferma per confermare!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Conferma!"
        }).then((result) => {
            resolve(result.isConfirmed)
        });
    })
}