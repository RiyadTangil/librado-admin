import toast from "react-hot-toast";
import swal from 'sweetalert';
const getTokens = () => {
    const token = JSON.parse(localStorage.getItem("loginInfo")).token
    return token || {}
}
export const POST_API = async (route, body, message) => {

    let isSuccess = false;
    const loading = toast.loading('Please wait...!');
    await fetch(`https://librado.evamp.in/${route}`, {
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

                swal(`${message} added`, `${message} has been  added successful.`, "success");
                isSuccess = true;
            }

        })
        .catch(error => {
            toast.dismiss(loading);
            swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
        })
    return isSuccess;

}
export const UPDATE_API = async (route, body, message) => {
    let isSuccess = false;
    const loading = toast.loading('Please wait...!');
    await fetch(`https://librado.evamp.in/${route}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/Json'
        },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(data => {
            toast.dismiss(loading);
            if (data.success) {
                swal(`${message} updated`, `${message} has been  added successful.`, "success");
                isSuccess = true;
            }

        })
        .catch(error => {
            toast.dismiss(loading);
            swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
        })
    return isSuccess;

}
export const ASSESSMENT_POST_API = async (route, id, body, message) => {
    let isSuccess = false;
    const loading = toast.loading('Please wait...!');
    await fetch(`https://librado.evamp.in/${route}/${id}`, {
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
                swal(`${message} added`, `${message} has been  added successful.`, "success");
                isSuccess = true;
            }
        })
        .catch(error => {
            toast.dismiss(loading);
            swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
        })
    return isSuccess;
}
export const Delete_API = async (route, id, message) => {
    let isSuccess = false;
    const loading = toast.loading('Please wait...!');
    await fetch(`https://librado.evamp.in/${route}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/Json'
        }
    })
        .then(response => response.json())
        .then(data => {
            toast.dismiss(loading);
            if (data.success) {
                swal(`${message} Deleted`, `${message} has been Deleted successful.`, "success");
                isSuccess = true;
            }
        })
        .catch(error => {
            toast.dismiss(loading);
            swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
        })
    return isSuccess;

}
export const GET_API = async (route) => {
    const token = await getTokens();
    let isSuccess = [];
    await fetch(`https://librado.evamp.in/${route}`, {
        method: 'get',
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {
            isSuccess = data?.data

        })
    return isSuccess;

}
export const IMG_UPLOAD_API = async (img) => {
    let imgUrl = null;
    const formData = new FormData()
    formData.append('file', img);
    await fetch("https://librado.evamp.in/upload", {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                imgUrl = data.data;
                console.log(imgUrl, "imgUrl")
            }

        })
        .catch(error => {
            toast.error("Img is not uploaded. try again")
        })
    return imgUrl;
}
export const ASSESSMENT_GET_API = async (id) => {
    // let   result;
    // await fetch(`https://librado.evamp.in/getCompanyById/${id}`)
    //     .then(res => res.json())
    //     .then(data => {
    //         result = data?.data
    //     })
    // return result;

}