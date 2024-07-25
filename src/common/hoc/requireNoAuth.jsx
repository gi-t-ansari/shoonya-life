import { Navigate } from "react-router";
import { APP_URL } from "../../config";
import { useState } from "react";

const requireNoAuth = (Component) => {
  function NoAuthHoc(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    return !isAuthenticated ? (
      <Navigate to={APP_URL.DASHBOARD} />
    ) : (
      <Component {...props} />
    );
  }

  return (
    <div className={`w-full min-h-screen flex justify-center items-center `}>
      <NoAuthHoc />
    </div>
  );
};
export default requireNoAuth;
