@echo off
title Push Rubina Website to GitHub
echo ========================================================
echo  Pushing Rubina Website to GitHub
echo  Repository: https://github.com/Kalidas10/Rubina_Birthday
echo ========================================================
echo.
cd /d "%~dp0"
echo Running git push to GitHub...
echo.
git push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo  SUCCESS! Your code is now live on GitHub:
    echo  https://github.com/Kalidas10/Rubina_Birthday
    echo ========================================================
) else (
    echo ========================================================
    echo  Push encountered an issue. See message above.
    echo ========================================================
)
echo.
pause
