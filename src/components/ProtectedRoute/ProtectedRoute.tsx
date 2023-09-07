import { PropsWithChildren } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { Navigate } from "react-router-dom";
import paths from "../../paths/paths";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const [user, isLoading] = useAuthState(auth);

  if (!isLoading && !user) {
    return <Navigate to={paths.homePage} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
