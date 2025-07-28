// src/data/users.ts

import bcrypt from "bcryptjs";
import { User } from "../types/user";

// Beispiel-Userdatenbank mit gehashten Passwörtern
const plainPassword = "test123"; // Nur zum Hashen!
const hashedPassword = bcrypt.hashSync(plainPassword, 10);

export const users: User[] = [
  {
    id: "1",
    username: "admin",
    password: hashedPassword,
    role: "admin",
  },
  {
    id: "2",
    username: "teamleiter1",
    password: hashedPassword,
    role: "teamleiter",
  },
  {
    id: "3",
    username: "mitarbeiter1",
    password: hashedPassword,
    role: "mitarbeiter",
  },
];