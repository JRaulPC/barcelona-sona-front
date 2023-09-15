import { toast } from "react-toastify";

export const deleteSuccessFeedback = "El objeto ha sido borrado con éxito";
export const createSuccesFeedback = "El objeto ha sido creado con éxito";

export const showFeedback = (message: string, type: "error" | "success") =>
  toast(message, {
    position: "top-left",
    theme: "dark",
    className: type,
  });
