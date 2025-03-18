import clientPromise from "../../lib/mongodb";
import { getSession } from "next-auth/react";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const userEmail = session.user.email;

  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("notifications");

  if (req.method === "GET") {
    try {
      const notifications = await collection
        .find({ userEmail })
        .sort({ createdAt: -1 })
        .toArray();
      res.status(200).json({ notifications });
    } catch (error) {
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
          user: process.env.GMAIL_USER, // e.g., no-reply@expandmybrand.net (set in your .env.local)
          pass: process.env.GMAIL_PASS, // Gmail password or app password
        },
      });

      const mailOptions = {
        from: "no-reply@prizeone.co.uk", // The alias you set up
        to: "notifications@prizeone.co.uk", // Your Google Group for receiving notifications
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
      res.status(500).json({ message: "Error saving notification" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
