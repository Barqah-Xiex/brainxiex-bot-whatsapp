@echo off
setlocal enabledelayedexpansion
set dirname=%cd%
set dirname=%dirname:\= %
for %%a in ("%cd%") do set dirname=%%~nxa

if "%1"=="" goto usage

:: ===== run =====
if "%1"=="run" (
    if not exist node_modules (
        echo Folder 'node_modules' tidak ditemukan. Menjalankan 'npm install'...
        call npm install
    )
    node .
    exit /b
)

:: ===== bun-run =====
if "%1"=="bun-run" (
    if not exist node_modules (
        echo Folder 'node_modules' tidak ditemukan. Menjalankan 'bun install'...
        call bun install
    )
    bun .
    exit /b
)

:: ===== install =====
if "%1"=="install" (
    for /f "tokens=1-3 delims=/ " %%a in ("%date%") do (
        set tanggal=%%a%%b%%c
    )
    echo Cloning...
    git clone https://github.com/Barqah-Xiex/brainxiex-bot-whatsapp.git %tanggal%
    cd %tanggal%
    robocopy . .. /E
    cd ..
    rmdir /S /Q %tanggal%
    call npm install
    exit /b
)

:: ===== reinstall =====
if "%1"=="reinstall" (
    call "%~f0" uninstall
    call "%~f0" install
    exit /b
)

:: ===== update =====
if "%1"=="update" (
    if "%2"=="hard" (
        git pull
        call npm install
        exit /b
    )
    if "%2"=="soft" (
        copy config.js %TEMP%\config_backup.js >nul
        git pull
        copy %TEMP%\config_backup.js config.js >nul
        call npm install
        exit /b
    )
    echo Usage: %0 update {hard^|soft}
    exit /b
)

:: ===== uninstall =====
if "%1"=="uninstall" (
    cd ..
    for /d %%G in ("%dirname%\*") do (
        if /i not "%%~nxG"=="linux" if /i not "%%~nxG"=="windows.bat" (
            echo Menghapus %%G
            rmdir /S /Q "%%G"
        )
    )
    for %%F in ("%dirname%\*") do (
        if not "%%~nxF"=="linux" if not "%%~nxF"=="windows.bat" (
            del /F /Q "%%F"
        )
    )
    echo Uninstalled all files except ./linux and ./windows.bat
    cd "%dirname%"
    exit /b
)

:usage
echo Usage: %0 ^<command^>
echo.
echo   run                 jalankan dengan node
echo   bun-run             jalankan dengan bun
echo   install             clone dan install
echo   reinstall           uninstall + install
echo   update hard|soft    update repo
echo   uninstall           hapus file kecuali linux dan windows
exit /b
