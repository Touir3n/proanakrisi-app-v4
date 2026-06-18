@echo off
set "APP_DIR=%~dp0"
set "INDEX_PATH=%APP_DIR%index.html"

start "" msedge --app="%INDEX_PATH%" --start-maximized

if %errorlevel% neq 0 (
    start "" chrome --app="%INDEX_PATH%" --start-maximized
)

exit
