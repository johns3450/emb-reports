"use client";
import { useSession } from "next-auth/react";

export default function Reports() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Access Denied</p>;

  return (
    <div>
      <iframe src="https://lookerstudio.google.com/embed/reporting/0dc53cbc-caa0-4e14-b3a4-25d05c94dd1c/page/c8RBF" width="1200" height="900"></iframe>
    </div>
  );
}
