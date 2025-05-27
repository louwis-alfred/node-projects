import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";

dotenv.config();

const users = [
  {
    id: 1,
    email: "test@example.com",
    password: bcrypt.hashSync("password123", 10),
  },
];

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);

  try {
    if (!user) {
      res.status(400).send("User not found");
      return;
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      res.status(400).send("Invalid password");
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {}
});
export default router;
