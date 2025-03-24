import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const BATCH_SIZE = 1000;
const TOTAL_RECORDS = 1000000;

async function main() {
	console.log("Начинаю заполнение базы данных...");

	const totalBatches = Math.ceil(TOTAL_RECORDS / BATCH_SIZE);
	let processedRecords = 0;

	for (let i = 0; i < totalBatches; i++) {
		const batchData = Array.from({ length: BATCH_SIZE }, () => ({
			name: faker.person.fullName(),
			department: faker.commerce.department(),
			company: faker.company.name(),
			jobTitle: faker.person.jobTitle(),
		}));

		await prisma.employee.createMany({
			data: batchData,
			skipDuplicates: true,
		});

		processedRecords += BATCH_SIZE;
		const progress = Math.min((processedRecords / TOTAL_RECORDS) * 100, 100);
		console.log(
			`Прогресс: ${progress.toFixed(2)}% (${processedRecords}/${TOTAL_RECORDS})`,
		);
	}

	console.log("База данных успешно заполнена!");
}

main()
	.catch((e) => {
		console.error("Ошибка при заполнении базы данных:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
