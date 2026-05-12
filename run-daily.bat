@echo off
setlocal EnableDelayedExpansion

:: ──────────────────────────────────────────────────────────────
:: 아뜨랑스 신상품 반응 분석 — 일일 자동 실행 스크립트
:: 매일 오전 9시 Windows 작업 스케줄러에 의해 실행됨
:: ──────────────────────────────────────────────────────────────

set PROJECT_DIR=C:\Users\df2354fh\newgoods-ai-report
set LOG_DIR=%PROJECT_DIR%\logs
set LOG_FILE=%LOG_DIR%\daily.log

:: 로그 디렉토리 생성
if not exist "%LOG_DIR%" mkdir "%LOG_DIR%"

:: 날짜 포맷 (YYYY-MM-DD)
for /f "tokens=1-3 delims=-/ " %%a in ('powershell -command "Get-Date -Format yyyy-MM-dd"') do (
  set TODAY=%%a-%%b-%%c
)
for /f "tokens=*" %%t in ('powershell -command "Get-Date -Format HH:mm:ss"') do (
  set NOW=%%t
)

echo. >> "%LOG_FILE%"
echo ============================================================ >> "%LOG_FILE%"
echo [%TODAY% %NOW%] 신상품 분석 자동 실행 시작 >> "%LOG_FILE%"
echo ============================================================ >> "%LOG_FILE%"

:: 프로젝트 폴더로 이동
cd /d "%PROJECT_DIR%"
if %errorlevel% neq 0 (
  echo [ERROR] 프로젝트 폴더를 찾을 수 없음: %PROJECT_DIR% >> "%LOG_FILE%"
  exit /b 1
)

:: ── Step 1: 데이터 추출 ──────────────────────────────────────
echo [%NOW%] Step 1: 데이터 추출 시작 >> "%LOG_FILE%"
call npm run extract >> "%LOG_FILE%" 2>&1

if %errorlevel% neq 0 (
  echo [ERROR] 데이터 추출 실패 — 분석 중단 >> "%LOG_FILE%"
  exit /b 1
)
echo [OK] 데이터 추출 완료 >> "%LOG_FILE%"

:: ── Step 2: 히어로 점수 분석 ────────────────────────────────
echo [%NOW%] Step 2: 히어로 점수 분석 시작 >> "%LOG_FILE%"
call npm run analyze >> "%LOG_FILE%" 2>&1

if %errorlevel% neq 0 (
  echo [ERROR] 분석 실패 >> "%LOG_FILE%"
  exit /b 1
)
echo [OK] 분석 완료 >> "%LOG_FILE%"

:: ── Step 3: GitHub Push ──────────────────────────────────────
echo [%NOW%] Step 3: GitHub Push 시작 >> "%LOG_FILE%"

git add data\newgoods-data.csv reports\newgoods-report.md >> "%LOG_FILE%" 2>&1

:: 변경 사항 있는지 확인
git diff --cached --quiet
if %errorlevel% equ 0 (
  echo [SKIP] 변경 사항 없음 — Push 생략 >> "%LOG_FILE%"
  goto :done
)

git commit -m "auto: 신상품 반응 분석 %TODAY%" >> "%LOG_FILE%" 2>&1
if %errorlevel% neq 0 (
  echo [ERROR] Git commit 실패 >> "%LOG_FILE%"
  exit /b 1
)

git push origin main >> "%LOG_FILE%" 2>&1
if %errorlevel% neq 0 (
  echo [ERROR] Git push 실패 >> "%LOG_FILE%"
  exit /b 1
)
echo [OK] GitHub Push 완료 >> "%LOG_FILE%"

:done
for /f "tokens=*" %%t in ('powershell -command "Get-Date -Format HH:mm:ss"') do set ENDTIME=%%t
echo [%TODAY% %ENDTIME%] 전체 완료 >> "%LOG_FILE%"
echo ============================================================ >> "%LOG_FILE%"

exit /b 0
