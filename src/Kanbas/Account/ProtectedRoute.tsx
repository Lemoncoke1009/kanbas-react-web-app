// src/Kanbas/Account/ProtectedRoute.tsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  roleRequired
}: {
  children: any;
  roleRequired?: string;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);


  if (!currentUser) {
    return <Navigate to="/Kanbas/Account/Signin" />;
  }

 
  if (roleRequired && currentUser.role !== roleRequired) {
    return null; 
  }


  return children;
}


