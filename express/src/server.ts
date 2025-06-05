import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth";
dotenv.config();

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(express.json());
app.use('/api/auth', authRouter)


app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`)
})