import { useEffect } from "react";
import { useUserAuth } from "../components/contexts/UserAuthContext";
import { useNavigate } from "react-router-dom";

function ProtectRoute({ children }) {
  const { isAuthenticated } = useUserAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  return isAuthenticated ? children : null;
}

export default ProtectRoute;
