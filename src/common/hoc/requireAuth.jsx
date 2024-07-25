import { Navigate } from "react-router";
import { APP_URL as URLS } from "../../config";
import Layout from "../layout/Layout";
import { useState } from "react";

const requireAuth = (Component) => {
  function AuthHoc(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return !isAuthenticated ? (
      <Layout>
        <Component {...props} />
      </Layout>
    ) : (
      <Navigate to={URLS.LOGIN} />
    );
  }

  return <AuthHoc />;
};
export default requireAuth;
