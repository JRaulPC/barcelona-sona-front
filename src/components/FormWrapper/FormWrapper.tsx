import { PropsWithChildren } from "react";
import "./FormWrapper.css";

const FormWrapper = ({ children }: PropsWithChildren): React.ReactElement => {
  return <>{children}</>;
};

export default FormWrapper;
