@echo off
chcp 65001
title Git Push - Отправка изменений на GitHub
echo ========================================
echo    ОТПРАВКА ИЗМЕНЕНИЙ НА GITHUB
echo ========================================
echo.

set /p commit_message="Введите описание изменений: "

git add .
git commit -m "%commit_message%"
git push origin main

if %errorlevel% == 0 (
    echo.
    echo ✅ Изменения отправлены успешно!
) else (
    echo.
    echo ❌ Ошибка при отправке!
)

echo.
pause