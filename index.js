import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();

const corsOptions = {
  origin: "https://anniversary-frontend.vercel.app",
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const USER = {
  username: "mummy_papa",
  password: process.env.HASHED_PASSWORD,
};

console.log("Stored password hash:", USER.password);

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== USER.username) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const isPasswordValid = bcrypt.compareSync(password, USER.password);

  console.log("Password entered:", password);
  console.log("Is password valid:", isPasswordValid);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign({ username }, "secret123", { expiresIn: "1h" });
  res.json({ token });
});

app.listen(5000, () => console.log("Server running on port 5000"));