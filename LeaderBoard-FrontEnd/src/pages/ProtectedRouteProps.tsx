import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("jwtToken"); // check JWT token

  if (!token) {
    return <Navigate to="/login" replace />; // redirect if not logged in
  }

  return children;
}
