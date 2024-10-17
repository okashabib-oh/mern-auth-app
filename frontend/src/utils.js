import { toast } from "react-toastify";

export const handleSuccess = (msg) => {
    toast.success(msg,
        {
            position: "top-right",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        }
    );
}
export const handleError = (msg) => {
    toast.error(msg,
        {
            position: "top-right",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        }
    );
}