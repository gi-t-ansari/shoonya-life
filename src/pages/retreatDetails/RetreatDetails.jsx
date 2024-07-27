import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RetreatDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.pathname.slice(1));
  return (
    <div>
      <p onClick={() => navigate(-1)}>{`<-- Back`}</p>
      <h1>Retreat Details</h1>
    </div>
  );
};

export default RetreatDetails;
