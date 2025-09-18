const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config(); // .env nằm trong backend/

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // cho phép frontend truy cập
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve frontend static files so you can open http://localhost:3000/index.html
app.use(express.static(path.join(__dirname, "../frontend")));

app.post("/send", async (req, res) => {
  const { email, message } = req.body;
  if (!email || !message)
    return res.status(400).json({ error: "Thiếu thông tin" });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
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
});

app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}`));
