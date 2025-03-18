"use client";
import { signOut, useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (!session) {
    return <p>Access Denied</p>;
  }

  function handleLogout() {
    signOut({ callbackUrl: "/login" }); 
  }

  return (
    <div style={{ margin: "20px" }}>
      <h1>Your Profile</h1>
      <p>Welcome, {session.user.email}!</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}
