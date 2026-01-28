CRM-система

Учебный проект CRM-системы для учёта клиентов и сделок. Реализован в рамках курсовой работы.

**Стек:** Django + Django REST Framework (backend), React (frontend), SQLite (БД).

---

## Содержание

- [Возможности](#возможности)
- [Структура проекта](#структура-проекта)
- [Требования](#требования)
- [Установка](#установка)
- [Запуск](#запуск)
- [API](#api)
- [Админ-панель](#админ-панель)

---

## Возможности

- **Клиенты** — просмотр списка клиентов с контактами, компанией и статусом (активный / неактивный).
- **Сделки** — список сделок с этапами (лид → контакт → предложение → переговоры → успех/потерян), суммой и вероятностью закрытия.
- **Веб-интерфейс** — вкладки «Клиенты» и «Сделки», карточки, индикатор вероятности по сделкам, кнопка обновления данных.
- **REST API** — полный CRUD для клиентов и сделок.
- **Админ-панель Django** — добавление и редактирование клиентов и сделок.

---

## Структура проекта

```
Diplom/
├── crm_diploma/           # Django-проект (backend)
│   ├── backend/           # Настройки, urls, wsgi
│   ├── clients/           # Модель Client, API, сериализаторы
│   ├── deals/             # Модель Deal, API, сериализаторы
│   ├── users/             # Приложение users (модели — по необходимости)
│   ├── manage.py
│   └── db.sqlite3         # БД (создаётся после миграций)
├── frontend/              # React-приложение (Create React App)
│   ├── src/
│   │   ├── App.js         # Основной UI: клиенты, сделки, загрузка данных
│   │   ├── components/    # Login, Dashboard, ProtectedRoute
│   │   └── ...
│   ├── package.json
│   └── public/
├── venv/                  # Виртуальное окружение Python (не в git)
├── requirements.txt       # Зависимости Python
├── back.bat               # Запуск Django-сервера (Windows)
├── front.bat              # Запуск React dev-сервера (Windows)
├── manage.py              # Удобная точка входа (см. раздел «Запуск»)
└── README.md
```

---

## Требования

- **Python** 3.10+ (рекомендуется 3.12)
- **Node.js** 18+ и **npm**
- ОС: Windows (скрипты `*.bat`), при необходимости — ручной запуск на Linux/macOS

---

## Установка

### 1. Клонирование и переход в проект

```bash
git clone <url-репозитория> Diplom
cd Diplom
```

### 2. Backend (Django)

Создайте виртуальное окружение в **корне** проекта:

```bash
python -m venv venv
```

Активируйте его:

- **Windows (cmd):** `venv\Scripts\activate.bat`
- **Windows (PowerShell):** `venv\Scripts\Activate.ps1`
- **Linux/macOS:** `source venv/bin/activate`

Установите зависимости:

```bash
pip install -r requirements.txt
```

Перейдите в каталог Django-проекта и выполните миграции:

```bash
cd crm_diploma
python manage.py migrate
```

Создайте суперпользователя для доступа в админку:

```bash
python manage.py createsuperuser
```

Вернитесь в корень: `cd ..`

### 3. Frontend (React)

```bash
cd frontend
npm install
cd ..
```

---

## Запуск

Перед работой с приложением должны быть запущены **и backend, и frontend**.

### Вариант 1: скрипты (Windows)

1. **Backend:** дважды кликнуть `back.bat` или в терминале:
   ```bash
   back.bat
   ```
   Django будет доступен по адресу: **http://127.0.0.1:8000**

2. **Frontend:** в **другом** терминале:
   ```bash
   front.bat
   ```
   React откроется, как правило, по адресу: **http://localhost:3000**

### Вариант 2: вручную

**Терминал 1 — backend:**

```bash
cd crm_diploma
python manage.py runserver
```

**Терминал 2 — frontend:**

```bash
cd frontend
npm start
```

После запуска откройте в браузере **http://localhost:3000**. Убедитесь, что backend запущен на **http://127.0.0.1:8000**, иначе загрузка клиентов и сделок не сработает.

---

## API

| Метод | URL | Описание |
|-------|-----|----------|
| GET | `/api/clients/` | Список клиентов |
| POST | `/api/clients/` | Создание клиента |
| GET | `/api/clients/<id>/` | Детали клиента |
| PUT / PATCH | `/api/clients/<id>/` | Обновление клиента |
| DELETE | `/api/clients/<id>/` | Удаление клиента |
| GET | `/api/deals/` | Список сделок |
| POST | `/api/deals/` | Создание сделки |
| GET | `/api/deals/<id>/` | Детали сделки |
| PUT / PATCH | `/api/deals/<id>/` | Обновление сделки |
| DELETE | `/api/deals/<id>/` | Удаление сделки |

Базовый URL API: **http://127.0.0.1:8000**.

Интерактивная документация (browsable API):  
http://127.0.0.1:8000/api/clients/ и http://127.0.0.1:8000/api/deals/

---

## Админ-панель

- URL: **http://127.0.0.1:8000/admin/**
- Вход по учётной записи суперпользователя, созданной через `createsuperuser`.
- В админке можно добавлять, редактировать и удалять **клиентов** и **сделки**. Данные, добавленные там, отображаются во фронтенде (вкладки «Клиенты» и «Сделки»).

---

## Полезные команды

```bash
# Миграции (из каталога crm_diploma)
python manage.py makemigrations
python manage.py migrate

# Запуск тестов (из crm_diploma)
python manage.py test

# Сборка React для production (из frontend)
npm run build
```

---

## Лицензия

Учебный проект. Использование — по согласованию с автором.

