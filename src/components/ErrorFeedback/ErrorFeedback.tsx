import { useAppDispatch } from "../../store";
import { hideErrorActionCreator } from "../../store/ui/uiSlice";

import "./ErrorFeedback.css";

const ErrorFeedback = (): React.ReactElement => {
  const dispatch = useAppDispatch();

  const closeError = () => {
    dispatch(hideErrorActionCreator());
  };

  return (
    <div className="error">
      <span>Something went wrong...</span>
      <button className="error-button" onClick={() => closeError()}>
        Close
      </button>
    </div>
  );
};

export default ErrorFeedback;
