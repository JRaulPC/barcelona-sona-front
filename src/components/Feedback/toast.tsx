import { toast } from "react-toastify";
import "./toast.css";

export const deleteSuccessFeedback = "El espacio ha sido borrado con éxito";
export const createSuccesFeedback = "El espacio ha sido creado con éxito";

export const showFeedback = (message: string, type: "error" | "success") =>
  toast[type](message, {
    position: "top-left",
    theme: "dark",
    className: type,
  });
