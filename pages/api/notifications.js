import clientPromise from "../../lib/mongodb";
import { getServerSession } from "next-auth"; 
import { authOptions } from "../auth/[...nextauth]"; // adjust path if needed
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  console.log("Cookies on request:", req.headers.cookie);

  // Handle preflight requests by sending CORS headers
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(200).end();
    return;
  }

  // Get the session from the server-side
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userEmail = session.user.email;

  try {
    const client = await clientPromise;
    const db = client.db("portalData");
    const collection = db.collection("notifications");

    if (req.method === "GET") {
      try {
        const notifications = await collection
          .find({ userEmail })
          .sort({ createdAt: -1 })
          .toArray();
        return res.status(200).json({ notifications });
      } catch (error) {
        console.error("Error fetching notifications:", error);
        return res.status(500).json({ message: "Error fetching notifications" });
      }
    } else if (req.method === "POST") {
      const { title, description, dateTime } = req.body;
      if (!title || !description || !dateTime) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const newNotification = {
        userEmail,
        title,
        description,
        dateTime: new Date(dateTime),
        createdAt: new Date(),
      };

      try {
        await collection.insertOne(newNotification);

        // Configure Nodemailer using Gmail SMTP.
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
          },
        });

        const mailOptions = {
          from: "no-reply@prizeone.co.uk",
          to: "notifications@prizeone.co.uk",
          subject: "New App Notification Request",
          text: `New notification request from ${userEmail}:
          
Title: ${title}
Description: ${description}
Scheduled Date/Time: ${dateTime}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Email sending error:", error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        return res.status(201).json({ message: "Notification logged successfully" });
      } catch (error) {
        console.error("Error saving notification:", error);
        return res.status(500).json({ message: "Error saving notification" });
      }
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (err) {
    // This catch is for errors connecting to MongoDB or other unexpected issues
    console.error("General error in API route:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
