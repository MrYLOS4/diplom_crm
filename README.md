# CRM «Itl-сервис»

Веб-приложение CRM: клиенты и сделки. Бэкенд — Django REST, фронтенд — React. Авторизация по сессии (логин/пароль).

## Стек

- **Бэкенд:** Python 3.12, Django 5.2, Django REST Framework, SQLite
- **Фронтенд:** React 19, React Router, Create React App
- **Запуск:** батники `back.bat` и `front.bat` (Windows)

## Структура проекта

```
Diplom/
├── crm_diploma/          # Django-проект
│   ├── backend/          # настройки (settings.py, urls.py)
│   ├── clients/          # приложение «Клиенты»
│   ├── deals/            # приложение «Сделки»
│   ├── users/            # авторизация (login/logout/me)
│   ├── manage.py
│   └── db.sqlite3        # БД (не коммитить)
├── frontend/             # React (CRA)
│   ├── src/
│   │   ├── api.js        # запросы к API, прокси на бэкенд
│   │   ├── App.js
│   │   ├── setupProxy.js # прокси /api -> Django
│   │   └── components/   # Login, Dashboard, ProtectedRoute
│   └── package.json
├── venv/                 # виртуальное окружение Python (не коммитить)
├── back.bat              # запуск Django (порт 8000)
├── front.bat             # запуск React (порт 3000)
├── requirements.txt
├── ОТЧЁТ_ИЗМЕНЕНИЙ.md    # журнал изменений
└── README.md
```

## Требования

- Python 3.12 (или совместимая версия)
- Node.js и npm
- Git (для синхронизации с репозиторием)

## Установка и первый запуск

### 1. Клонирование и окружение

```bash
# Клонировать репозиторий (если ещё не клонирован)
git clone <URL_репозитория> Diplom
cd Diplom

# Виртуальное окружение Python (из корня проекта)
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Бэкенд (Django)

```bash
cd crm_diploma
python manage.py migrate
python manage.py createsuperuser   # опционально: админка
cd ..
```

Запуск: двойной клик по **back.bat** или из терминала:

```bash
cd crm_diploma
..\venv\Scripts\python.exe manage.py runserver
```

Бэкенд: http://127.0.0.1:8000  
Админка: http://127.0.0.1:8000/admin/

### 3. Фронтенд (React)

```bash
cd frontend
npm install
cd ..
```

Запуск: двойной клик по **front.bat** или из терминала:

```bash
cd frontend
npm start
```

Фронтенд: http://localhost:3000  
Логин: страница `/login` — те же учётные данные, что и в админке Django.

## Синхронизация с Git (git_sync, git_push, git_pull)

Батники предполагают ветку **main** и удалённый репозиторий **origin**.

### Почему «ошибка синхронизации» или «ошибка отправки»

1. **Нет доступа к origin**  
   Проверьте: `git remote -v`. Если репозиторий на GitHub по HTTPS — нужен [Personal Access Token](https://github.com/settings/tokens) вместо пароля. Либо настройте SSH и смените URL на `git@github.com:...`.

2. **Ветка на удалённом репозитории не main**  
   Если по умолчанию ветка `master`, в батниках замените `main` на `master` или настройте на удалённой стороне ветку `main`.

3. **В индексе остались файлы, которые должны игнорироваться**  
   Если в `git status` видны `db.sqlite3`, папки `__pycache__` и т.п., они когда-то были добавлены в репозиторий. `.gitignore` не отменяет уже отслеживаемые файлы. Один раз нужно снять их с индекса и закоммитить это изменение — см. ниже.

### Один раз: убрать из индекса игнорируемые файлы

Выполните из **корня проекта** (где лежит `.git`):

Можно выполнить вручную или запустить батник **git_untrack_ignored.bat** (один раз):

```bash
git rm --cached crm_diploma/db.sqlite3 2>nul
git rm -r --cached crm_diploma/backend/__pycache__ 2>nul
git rm -r --cached crm_diploma/clients/__pycache__ 2>nul
git rm -r --cached crm_diploma/deals/__pycache__ 2>nul
git rm -r --cached crm_diploma/deals/migrations/__pycache__ 2>nul
git rm -r --cached crm_diploma/users/__pycache__ 2>nul
git rm -r --cached crm_diploma/users/migrations/__pycache__ 2>nul
git add .
git status
```

Затем сделайте коммит и отправку:

```bash
git commit -m "chore: перестать отслеживать db.sqlite3 и __pycache__"
git push origin main
```

После этого `git status` не должен показывать эти файлы, а **git_sync** / **git_push** смогут отрабатывать без лишних изменений по БД и кэшу.

## Документация изменений

Подробный журнал правок — в файле **ОТЧЁТ_ИЗМЕНЕНИЙ.md**.

