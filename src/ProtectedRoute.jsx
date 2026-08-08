import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Wait until Firebase checks the login state
  if (user === undefined) {
    return <h2>Loading...</h2>;
  }

  // If not logged in, go to Login page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Logged in
  return children;
};

export default ProtectedRoute;