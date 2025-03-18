"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function NotificationsPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("new");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchNotifications();
    }
  }, [status]);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      if (res.ok) {
        setNotifications(data.notifications);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, dateTime }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Notification request logged successfully.");
        setTitle("");
        setDescription("");
        setDateTime("");
        fetchNotifications();
      } else {
        setMessage(data.message || "Error logging notification request.");
      }
    } catch (error) {
      setMessage("Error logging notification request.");
    }
  };

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Access Denied</p>;

  return (
    <div className="container">
      <h1>App Notification Requests</h1>
      <div className="tabs">
        <button
          className={activeTab === "new" ? "active" : ""}
          onClick={() => setActiveTab("new")}
        >
          New Request
        </button>
        <button
          className={activeTab === "existing" ? "active" : ""}
          onClick={() => setActiveTab("existing")}
        >
          Existing Requests
        </button>
      </div>

      {activeTab === "new" && (
        <div className="new-request">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div>
              <label>Date/Time:</label>
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                required
              />
            </div>
            <button type="submit">Log Request</button>
          </form>
          {message && <p className="message">{message}</p>}
          <p className="info">
            48 hours required to guarantee delivery. Once a notification has been
            logged, you must contact us to make an edit, although this cannot be
            guaranteed.
          </p>
        </div>
      )}

      {activeTab === "existing" && (
        <div className="existing-requests">
          <h2>Your Logged Requests</h2>
          {notifications.length === 0 ? (
            <p>No notifications found.</p>
          ) : (
            <ul>
              {notifications.map((notif) => (
                <li key={notif._id}>
                  <strong>{notif.title}</strong> -{" "}
                  {new Date(notif.dateTime).toLocaleString()}
                  <p>{notif.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <style jsx>{`
        .container {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
          background-color: #f0f0f0;
          min-height: calc(100vh - 60px); /* accounting for footer */
        }
        .tabs {
          margin: 20px 0;
        }
        .tabs button {
          padding: 10px 20px;
          margin-right: 10px;
          cursor: pointer;
        }
        .tabs button.active {
          font-weight: bold;
          background-color: #0070f3;
          color: white;
        }
        form div {
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 5px;
        }
        input[type="text"],
        input[type="datetime-local"],
        textarea {
          width: 100%;
          padding: 8px;
          box-sizing: border-box;
        }
        button[type="submit"] {
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          border: none;
          cursor: pointer;
        }
        .message {
          margin-top: 10px;
        }
        .info {
          margin-top: 20px;
          font-size: 0.9rem;
          color: #555;
        }
      `}</style>
    </div>
  );
}
