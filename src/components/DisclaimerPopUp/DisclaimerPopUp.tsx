import { useState } from "react";
import "./DisclaimerPopUp.css";

const DisclaimerPopUp = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="popup-box">
        <p className="popup-box_text">
          ¡Bienvenid@!
          <br />
          <br />
          Esta página es una demostración de cómo funcionaría la plataforma para
          almacenar respuestas al impulso del proyecto Barcelona Reverbera. La
          página es completamente funcional una vez que te has registrado,
          creando un usuario en el backend de la aplicación y permitiendo la
          gestión de espacios vinculados al usuario que los crea.
        </p>
        <button className="popup-box_close-button" onClick={handleClose}>
          Ok
        </button>
      </div>
    )
  );
};

export default DisclaimerPopUp;
