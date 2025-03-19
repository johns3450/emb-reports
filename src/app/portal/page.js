"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function PortalPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Access Denied</p>;

  const goToPage = (page) => {
    router.push(page);
  };

  return (
    <div className="container">
      <div className="header-text">
      <h1>Welcome to the ExpandMyBrand Customer Portal</h1>
      <p>Access your reports, app notification requests, and more.</p>
      </div>
      <div className="boxes">
        <div className="box" onClick={() => goToPage("/reports")}>
          <h2>AI Chatbot Reports</h2>
        </div>
        <div className="box" onClick={() => goToPage("/notifications")}>
          <h2>App Notification Requests</h2>
        </div>
        {/* New billing link box */}
        <div
          className="box"
          onClick={() =>
            window.open("https://books.zohosecure.eu/portal/expandmybrand", "_blank")
          }
        >
          <h2>Billing & Invoices</h2>
          {/* "External link" label with a small arrow icon */}
          <p style={{ marginTop: 10, fontSize: "0.9rem" }}>
            External link <span style={{ fontSize: "1rem" }}>↗</span>
          </p>
        </div>
      </div>

      <style jsx>{`
        .container {
          padding: 20px;
          text-align: center;
          background-color: #f0f0f0;
          min-height: calc(100vh - 60px); /* accounting for footer */
        }
        .header-text {
          gap: 10px;
        }
        .logo {
          max-width: 200px;
          margin: 20px auto;
        }
        .boxes {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 40px;
        }
        .box {
          background-color: #fff;
          padding: 40px;
          cursor: pointer;
          border: 1px solid #ccc;
          width: 200px;
          transition: transform 0.2s;
        }
        .box:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
