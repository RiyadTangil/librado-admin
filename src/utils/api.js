import toast from "react-hot-toast";
import swal from 'sweetalert';
export function API(route, body) {

    const loading = toast.loading('Please wait...!');
    fetch(`http://localhost:3333/${route}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/Json'
        },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(data => {
            toast.dismiss(loading);
            if (data.success) {
                return swal(`Planning report added`, `Planning has been  added successful.`, "success");
            }
            swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
        })
        .catch(error => {
            toast.dismiss(loading);
            swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
        })
    return "";
}