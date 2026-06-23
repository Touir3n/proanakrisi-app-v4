@echo off
set "HTML_FILE=%~dp0index.html"
start msedge --app="%HTML_FILE%"
exit
