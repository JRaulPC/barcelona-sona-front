import { toast } from "react-toastify";

export const deleteSuccessFeedback = "El objeto ha sido borrado con éxito";
export const createSuccesFeedback = "El objeto ha sido creado con éxito";

export const showFeedback = (
  message: string,
  type: "error" | "success",
  className: string,
) =>
  toast[type](message, {
    position: "top-left",
    className: className,
    theme: "dark",
  });
