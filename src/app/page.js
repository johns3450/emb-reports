// src/app/page.js
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

// This is a Server Component
export default async function Home() {
  const session = await getServerSession(authOptions);

  // If not logged in, go to login
  if (!session) {
    redirect("/login");
  }

  // Otherwise, send them to the portal
  redirect("/portal");
}
