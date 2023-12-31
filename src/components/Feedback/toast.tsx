import { toast } from "react-toastify";
import "./toast.css";

export const deleteSuccessFeedback = "El espacio ha sido borrado con éxito";
export const createSuccesFeedback = "El espacio ha sido creado con éxito";
export const accountSuccesFeedback = "Cuenta creada con éxito";
export const wrongPassword = "La contraseña es incorrecta";
export const wrongEmail = "La dirección no está registrada";

export const showFeedback = (message: string, type: "error" | "success") =>
  toast[type](message, {
    autoClose: 1500,
    position: "top-left",
    theme: "dark",
    className: type,
  });
