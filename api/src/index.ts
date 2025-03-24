import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express, { type Request, type Response } from "express";

const port = process.env.PORT || 3001;
const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Получение списка пользователей с пагинацией
app.get("/api/employees", async (req: Request, res: Response) => {
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 50;
	const skip = (page - 1) * limit;

	try {
		const [employees, total] = await Promise.all([
			prisma.employee.findMany({
				skip,
				take: limit,
				select: {
					id: true,
					name: true,
				},
				orderBy: {
					id: "asc",
				},
			}),
			prisma.employee.count(),
		]);

		res.json({
			employees,
			total,
			page,
			totalPages: Math.ceil(total / limit),
		});
	} catch (error) {
		console.error("Ошибка при получении списка сотрудников:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// Получение детальной информации о пользователе
app.get("/api/employees/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const employee = await prisma.employee.findUnique({
			where: {
				id: Number(id),
			},
		});

		if (!employee) {
			return res.status(404).json({ error: "Сотрудник не найден" });
		}

		res.json(employee);
	} catch (error) {
		console.error("Ошибка при получении информации о сотруднике:", error);
		res.status(500).json({ error: "Внутренняя ошибка сервера" });
	}
});

// Обновление информации о пользователе
app.put("/api/employees/:id", async (req, res) => {
	const { id } = req.params;
	const { name, department, company, jobTitle } = req.body;

	try {
		const updatedEmployee = await prisma.employee.update({
			where: {
				id: Number(id),
			},
			data: {
				name,
				department,
				company,
				jobTitle,
			},
		});

		res.json(updatedEmployee);
	} catch (error) {
		console.error("Ошибка при обновлении информации о сотруднике:", error);
		res.status(500).json({ error: "Внутренняя ошибка сервера" });
	}
});

app.listen(port, () => {
	console.log(`🚀 Сервер запущен на порту ${port}`);
});
