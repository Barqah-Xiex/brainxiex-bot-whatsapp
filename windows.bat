@echo off
setlocal enabledelayedexpansion

REM Ambil nama folder kerja saat ini
for %%I in (.) do set DIRNAME=%%~nxI

if "%1"=="run" goto RUN
if "%1"=="bun-run" goto BUNRUN
if "%1"=="install" goto INSTALL
if "%1"=="reinstall" goto REINSTALL
if "%1"=="update" goto UPDATE
if "%1"=="uninstall" goto UNINSTALL

echo Usage: windows.bat ^<command^>
echo.
echo   run                      jalankan dengan node
echo   bun-run                  jalankan dengan bun
echo   install                  clone dan install
echo   reinstall                uninstall + install
echo   update hard^|soft^|force^|base   update repo
echo   uninstall                hapus file kecuali linux dan windows.bat
exit /b 0

:RUN
if not exist node_modules (
  echo Folder 'node_modules' tidak ditemukan. Menjalankan 'npm install'...
  npm install || exit /b 1
)
node .
exit /b 0

:BUNRUN
where bun >nul 2>&1
if errorlevel 1 (
  echo Bun tidak ditemukan. Silakan install Bun manual di Windows.
  exit /b 1
)
if not exist node_modules (
  echo Folder 'node_modules' tidak ditemukan. Menjalankan 'bun install'...
  bun install || exit /b 1
)
bun .
exit /b 0

:INSTALL
for /f %%D in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd"') do set DATE=%%D
git clone https://github.com/Barqah-Xiex/brainxiex-bot-whatsapp.git %DATE% || exit /b 1
cd %DATE% || exit /b 1

REM Copy semua kecuali folder fitur dan cmd
for /d %%F in (*) do (
  if /I not "%%F"=="fitur" if /I not "%%F"=="cmd" (
    xcopy "%%F" "..\%%F" /E /I /H /Y >nul
  )
)
for %%F in (*) do (
  if not exist "%%F\" (
    xcopy "%%F" "..\%%F" /Y >nul
  )
)

cd ..
rmdir /s /q %DATE%

npm install || exit /b 1
exit /b 0

:REINSTALL
call windows.bat uninstall
call windows.bat install
exit /b 0

:UPDATE
if "%2"=="hard" goto UPDATE_HARD
if "%2"=="soft" goto UPDATE_SOFT
if "%2"=="force" goto UPDATE_FORCE
if "%2"=="base" goto UPDATE_BASE

echo Usage: windows.bat update hard^|soft^|force^|base
exit /b 1

:UPDATE_HARD
git pull || exit /b 1
npm install || exit /b 1
exit /b 0

:UPDATE_SOFT
copy config.js %TEMP%\config_backup.js >nul
git pull || exit /b 1
copy %TEMP%\config_backup.js config.js >nul
npm install || exit /b 1
exit /b 0

:UPDATE_FORCE
copy config.js %TEMP%\config_backup.js >nul
call windows.bat install
copy %TEMP%\config_backup.js config.js >nul
exit /b 0

:UPDATE_BASE
copy config.js %TEMP%\config_backup.js >nul
for /f %%D in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd"') do set DATE=%%D
git clone https://github.com/Barqah-Xiex/brainxiex-bot-whatsapp.git %DATE% || exit /b 1
cd %DATE% || exit /b 1

REM Copy semua kecuali folder fitur dan cmd
for /d %%F in (*) do (
  if /I not "%%F"=="fitur" if /I not "%%F"=="cmd" (
    xcopy "%%F" "..\%%F" /E /I /H /Y >nul
  )
)
for %%F in (*) do (
  if not exist "%%F\" (
    xcopy "%%F" "..\%%F" /Y >nul
  )
)

cd ..
rmdir /s /q %DATE%
npm install || exit /b 1
copy %TEMP%\config_backup.js config.js >nul
exit /b 0

:UNINSTALL
cd .. || exit /b 1
for %%F in (%DIRNAME%\*) do (
  if /I not "%%~nxF"=="linux" if /I not "%%~nxF"=="windows.bat" (
    rmdir /s /q "%%F" 2>nul || del /f /q "%%F"
    echo Menghapus %%F
  )
)
echo Uninstalled kecuali .\linux dan .\windows.bat
cd %DIRNAME%
exit /b 0
