import clientPromise from "../../lib/mongodb";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]"; // adjust path as needed
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(200).end();
    return;
  }

  // Use unstable_getServerSession to get the session on the server
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const userEmail = session.user.email;

  try {
    const client = await clientPromise;
    const db = client.db("portalData"); // updated to your database name
    const collection = db.collection("notifications");

    if (req.method === "GET") {
      try {
        const notifications = await collection
          .find({ userEmail })
          .sort({ createdAt: -1 })
          .toArray();
        res.status(200).json({ notifications });
      } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ message: "Error fetching notifications" });
      }
    } else if (req.method === "POST") {
      const { title, description, dateTime } = req.body;
      if (!title || !description || !dateTime) {
        res.status(400).json({ message: "Missing required fields" });
        return;
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

        res.status(201).json({ message: "Notification logged successfully" });
      } catch (error) {
        console.error("Error saving notification:", error);
        res.status(500).json({ message: "Error saving notification" });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (err) {
    console.error("General error in API route:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
