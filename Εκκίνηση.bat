@echo off
set "HTML_FILE=%~dp0index.html"

REM Try launching with Chrome
start chrome --app="file:///%HTML_FILE%" 2>nul
if %errorlevel% equ 0 exit

REM Try launching with Edge
start msedge --app="file:///%HTML_FILE%" 2>nul
if %errorlevel% equ 0 exit

REM Fallback to default browser
start "" "%HTML_FILE%"
exit
