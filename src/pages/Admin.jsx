import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // user is logged in
      } else {
        navigate("/admin-login"); // redirect if not logged in
      }
      setLoading(false);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin-login");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {/* Top: welcome message and logout */}
      <p>Welcome, {user?.email}</p>
      <button onClick={handleLogout}>Logout</button>

      {/* Main heading */}
      <h1>Admin Dashboard</h1>

      {/* Placeholder for content / sections */}
      <p>This is your admin panel. Add your sections here.</p>
    </div>
  );
}
