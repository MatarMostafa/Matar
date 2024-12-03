import express from "express";

const app = express();
const PORT = 8000;

// روت ساده
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// شروع به گوش دادن روی پورت
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
