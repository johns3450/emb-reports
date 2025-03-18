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
      <h1>Welcome to the ExpandMyBrand Portal</h1>
      <img src="/ExpandMyBrand_Logo.png" alt="ExpandMyBrand Logo" className="logo" />
      <p>Access your reports, app notifications, and more.</p>
      <div className="boxes">
        <div className="box" onClick={() => goToPage("/reports")}>
          <h2>Reports</h2>
        </div>
        <div className="box" onClick={() => goToPage("/notifications")}>
          <h2>App Notifications</h2>
        </div>
      </div>

      <style jsx>{`
        .container {
          padding: 20px;
          text-align: center;
          background-color: #f0f0f0;
          min-height: calc(100vh - 60px); /* accounting for footer */
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
