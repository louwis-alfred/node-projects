import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth";
import { authMiddleware } from "./middleware/authMiddleware";
dotenv.config();

const app = express();

app.use(cors());

app.get("/", authMiddleware, (req, res) => {
  res.send("Secured Endpoint");
});

app.use(express.json());
app.use('/api/auth', authRouter)


app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`)
})