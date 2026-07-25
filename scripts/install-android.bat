@echo off
set "ANDROID_HOME=C:\Users\My PC\AppData\Local\Android\Sdk"
set "ANDROID_SDK_ROOT=%ANDROID_HOME%"
set "JAVA_HOME=C:\Program Files\Android\Android Studio1\jbr"
set "PATH=%JAVA_HOME%\bin;%PATH%"
cd /d "%~dp0.."
call node scripts\patch-ndk-windows.js
call npm run android:install
