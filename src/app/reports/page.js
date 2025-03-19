"use client";
import { useSession } from "next-auth/react";

export default function Reports() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Access Denied</p>;

  return (
    <>
      <div className="container">
        <h1 className="title">AI Chatbot Reports Dashboard</h1>
        <div className="iframe-container">
        <iframe src="https://lookerstudio.google.com/embed/reporting/0dc53cbc-caa0-4e14-b3a4-25d05c94dd1c/page/c8RBF" width="100%" height="900"></iframe>
        </div>
      </div>

      <style jsx>{`
        .container {
          background-color: #f0f0f0;
          /* Subtract footer height (approx 60px) so content doesn't get hidden behind it */
          min-height: calc(100vh - 60px);
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .title {
          font-size: 2rem;
          margin-bottom: 10px;
          text-align: center;
        }
        .logo {
          max-width: 200px;
          margin-bottom: 40px;
        }
        .iframe-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }
      `}</style>
    </>
  );
}
