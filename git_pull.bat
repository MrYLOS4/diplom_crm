@echo off
chcp 65001
title Git Pull - Синхронизация с GitHub
echo ========================================
echo    ПОЛУЧЕНИЕ ОБНОВЛЕНИЙ С GITHUB
echo ========================================
echo.

git pull origin main

if %errorlevel% == 0 (
    echo.
    echo ✅ Синхронизация завершена успешно!
) else (
    echo.
    echo ❌ Ошибка при синхронизации!
)

echo.
pause