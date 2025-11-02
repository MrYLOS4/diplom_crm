@echo off
chcp 65001
title CRM Backend Server
echo ========================================
echo    ЗАПУСК CRM БЭКЕНДА (Django)
echo ========================================

:: Переходим в папку с manage.py
cd /d "%~dp0crm_diploma"

:: Ищем python в виртуальном окружении (правильный путь)
if exist "..\venv\Scripts\python.exe" (
    "..\venv\Scripts\python.exe" manage.py runserver
) else if exist "venv\Scripts\python.exe" (
    "venv\Scripts\python.exe" manage.py runserver
) else (
    echo Виртуальное окружение не найдено
    echo Создайте его в корне проекта: python -m venv venv
    echo Затем установите зависимости: pip install -r requirements.txt
    pause
    exit /b 1
)
pause