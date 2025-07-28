// src/Services/registerService.ts

import bcrypt from "bcryptjs";
import { users, User } from "../data/users";

export const registerUser = async (email: string, password: string, role: string) => {
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    throw new Error("Benutzer existiert bereits");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: users.length + 1,
    email,
    password: hashedPassword,
    role,
  };

  users.push(newUser);

  return {
    message: "Benutzer erfolgreich registriert",
    user: {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    },
  };
};