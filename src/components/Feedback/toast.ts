import { toast } from "react-toastify";

export const showFeedback = (message: string, type: "error" | "success") =>
  toast[type](message, {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
