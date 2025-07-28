import bcrypt from "bcryptjs";

export const users = [
  {
    id: 1,
    email: "test@example.com",
    password: bcrypt.hashSync("geheim123", 10),
    role: "kunde",
  },
  {
    id: 2,
    email: "admin@example.com",
    password: bcrypt.hashSync("adminpass", 10),
    role: "admin",
  },
];
import bewertungRoutes from "./Routes/bewertungRoutes";

// ...
app.use("/api/bewertungen", bewertungRoutes);