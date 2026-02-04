# Code Clicker

Игра-кликер в стиле Cookie Clicker с программистской тематикой. Кликай чтобы генерировать коммиты, покупай апгрейды и становись легендарным разработчиком!

## Технологии

- **Monorepo**: Turborepo + Bun
- **Frontend**: React + Vite + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion + Zustand
- **Backend**: Elysia + Bun
- **Shared**: Zod schemas + TypeScript types

## Запуск

### 1. Установка зависимостей

```bash
bun install
```

### 2. Запуск в режиме разработки

```bash
bun dev
```

Это запустит:
- Frontend на http://localhost:3000
- API на http://localhost:3001

## Игровая механика

### Валюта
- **Commits** - основная валюта игры

### Апгрейды

| Название | Базовая цена | CPS |
|----------|-------------|-----|
| Hello World | 15 | 0.1 |
| HTML | 100 | 0.5 |
| CSS | 500 | 2 |
| `<script>` | 2,000 | 8 |
| jQuery | 10,000 | 30 |
| npm install | 50,000 | 100 |
| React | 250,000 | 400 |
| TypeScript | 1,000,000 | 1,500 |
| Docker | 5,000,000 | 5,000 |
| Kubernetes | 25,000,000 | 20,000 |
| AI Copilot | 100,000,000 | 100,000 |

### Достижения

- First Commit - сделай первый клик
- Hello World - купи первый апгрейд
- 100/1K/10K/100K/1M Commits - накопи коммиты
- Full Stack - купи все апгрейды до React
- 10x/100x Engineer - достигни высокий CPS
- Click Addict - 1,000 кликов
- Open Source Hero - играй 1 час
- Tech Lead - купи все типы апгрейдов

## Структура проекта

```
├── apps/
│   ├── web/          # React frontend
│   └── api/          # Elysia backend
├── packages/
│   └── shared/       # Shared types & schemas
├── turbo.json
└── package.json
```
