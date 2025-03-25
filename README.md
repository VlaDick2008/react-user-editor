# Редактор сотрудников (React + Redux + Prisma + Express + PostgreSQL)

Приложение для управления базой данных сотрудников с возможностью просмотра и редактирования информации.

## Требования

- [Bun](https://bun.sh/)
- [Docker](https://www.docker.com/) и Docker Compose для запуска PostgreSQL
- Node.js 18.0.0 или выше

## Установка

1. Клонировать репозиторий:
```bash
git clone <https://github.com/VlaDick2008/react-user-editor>
cd react-user-editor
```

2. Установить зависимости:
```bash
bun install
```

## Настройка базы данных

1. Создать файл `.env` в папке `api` со следующим содержимым:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/user_editor?schema=public"
```

2. Запустить PostgreSQL через Docker:
```bash
cd api
docker-compose up -d
```

3. Сгенерировать Prisma клиент:
```bash
bun run --cwd api db:generate
```

4. Применить миграции:
```bash
bun run --cwd api db:push
```

5. Заполнить базу данных тестовыми данными (этот процесс может занять некоторое время, так как создается 1 миллион записей):
```bash
bun run --cwd api db:seed
```

## Запуск проекта

### Режим разработки

Запустить API и клиент одновременно:
```bash
bun run dev
```

Или запустить компоненты отдельно:
```bash
# Запуск только API
bun run --cwd api dev

# Запуск только клиента
bun run --cwd client dev
```

### Сборка для продакшена

```bash
bun run build
```

## API Эндпоинты

- `GET /api/employees?page=1&limit=50` - получение списка сотрудников
- `GET /api/employees/:id` - получение информации о конкретном сотруднике
- `PUT /api/employees/:id` - обновление информации о сотруднике
