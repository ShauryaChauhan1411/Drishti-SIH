import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  let authResolved = false;

  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (authResolved) return;

    authResolved = true;

    if (
      currentUser &&
      currentUser.email?.toLowerCase() === "chauhanshaurya1411@gmail.com"
    ) {
      setUser(currentUser);
    } else {
      setUser(null);
    }

    setLoading(false);
  });

  const timeout = setTimeout(() => {
    if (!authResolved) {
      authResolved = true;
      setUser(auth.currentUser);
      setLoading(false);
    }
  }, 5000);

  return () => {
    clearTimeout(timeout);
    unsubscribe();
  };
}, []);

 if (loading) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f172a",
        color: "#94a3b8",
        gap: "16px",
      }}
    >
      <div
        style={{
          width: "32px",
          height: "32px",
          border: "3px solid #334155",
          borderTop: "3px solid #94a3b8",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />

      <div>Loading...</div>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}