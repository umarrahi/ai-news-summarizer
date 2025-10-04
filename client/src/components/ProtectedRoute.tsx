// client/src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  // Wait for auth context to finish loading (optional)
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-sm text-muted-foreground">
        Checking authentication...
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the page
  return <>{children}</>;
};

export default ProtectedRoute;
