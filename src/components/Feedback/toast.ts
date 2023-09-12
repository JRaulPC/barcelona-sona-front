import { toast } from "react-toastify";

export const showError = () =>
  toast.error("No se pueden cargar tus espacios", {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
