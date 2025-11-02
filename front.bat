@echo off
chcp 65001
title CRM Frontend Server
echo ========================================
echo   ЗАПУСК CRM ФРОНТЕНДА (React)
echo ========================================

:: Переходим в папку frontend
cd /d "%~dp0frontend"

:: Проверяем есть ли node_modules
if not exist "node_modules" (
    echo Установка зависимостей npm...
    npm install
)

:: Запускаем фронтенд
npm start
pause