import nodemailer from "nodemailer";
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, message } = req.body;
  if (!email || !message) {
    return res.status(400).json({ error: "Thiếu thông tin" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: "Thư tâm sự từ website",
      text: `Người gửi: ${email}\n\n${message}`,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Send mail error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}
