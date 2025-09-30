// src/components/ProtectedRoute.js
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import { Navigate } from "react-router-dom";

import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useSelector(selectUser);
  console.log("user", user);
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
