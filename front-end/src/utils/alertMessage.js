import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal) 

export const alertErrorMessage = (errorMessage) => {
    return MySwal.fire({
        title: `${errorMessage}`,
        icon: "error",
        showCloseButton: false,
        buttonsStyling: false,
        customClass: {
            confirmButton: "btn btn-primary mx-3",
            title: "h4 font",
            popup: "card",
        },
    })
}

export const alertSuccessMessage = (successMessage, timer) => {
    MySwal.fire({
        title: `${successMessage}`,
        icon: "success",
        timer: `${timer}`,
        showConfirmButton: false,
        showCloseButton: false,
        buttonsStyling: false,
        customClass: {
            title: "h4 font",
            popup: "card",
        },
    })
}

