import cors from "cors";
import express, { type Request, type Response } from "express";

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Тестовый маршрут
app.get("/", (req: Request, res: Response) => {
	res.json({ message: "API работает!" });
});

app.listen(port, () => {
	console.log(`🚀 Сервер запущен на порту ${port}`);
});
