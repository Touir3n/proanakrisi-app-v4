@echo off
chcp 65001 >nul
:: Βρίσκει την ακριβή διαδρομή του φακέλου όπου βρίσκεται αυτό το αρχείο
set "APP_DIR=%~dp0"
set "INDEX_PATH=%APP_DIR%index.html"

:: Προσπαθεί να τρέξει τον Chrome σε λειτουργία Εφαρμογής (App Mode) και μεγιστοποιημένο
start chrome --app="%INDEX_PATH%" --start-maximized

:: Αν ο υπολογιστής δεν έχει Chrome, θα το ανοίξει με τον Microsoft Edge
if %errorlevel% neq 0 (
    start msedge --app="%INDEX_PATH%" --start-maximized
)

exit
