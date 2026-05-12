# ──────────────────────────────────────────────────────────────
# 아뜨랑스 신상품 분석 — Windows 작업 스케줄러 등록 스크립트
# 관리자 권한으로 실행 필요
# 실행: powershell -ExecutionPolicy Bypass -File setup-task.ps1
# ──────────────────────────────────────────────────────────────

$TaskName   = "AttrangsNewGoodsAnalysis"
$BatFile    = "C:\Users\df2354fh\newgoods-ai-report\run-daily.bat"
$RunAt      = "09:00"
$LogDir     = "C:\Users\df2354fh\newgoods-ai-report\logs"

Write-Host ""
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host " 아뜨랑스 신상품 분석 — 작업 스케줄러 등록" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host ""

# 로그 폴더 생성
if (-not (Test-Path $LogDir)) {
  New-Item -ItemType Directory -Path $LogDir -Force | Out-Null
  Write-Host "[OK] 로그 폴더 생성: $LogDir" -ForegroundColor Green
}

# bat 파일 존재 확인
if (-not (Test-Path $BatFile)) {
  Write-Host "[ERROR] run-daily.bat 파일을 찾을 수 없음: $BatFile" -ForegroundColor Red
  exit 1
}

# 기존 작업 제거 (재등록 시 충돌 방지)
$existing = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
if ($existing) {
  Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
  Write-Host "[INFO] 기존 작업 제거 완료" -ForegroundColor Yellow
}

# 트리거: 매일 오전 9시
$trigger = New-ScheduledTaskTrigger -Daily -At $RunAt

# 액션: cmd.exe로 bat 파일 실행
$action = New-ScheduledTaskAction `
  -Execute "cmd.exe" `
  -Argument "/c `"$BatFile`" > `"$LogDir\task-runner.log`" 2>&1"

# 설정
$settings = New-ScheduledTaskSettingsSet `
  -ExecutionTimeLimit (New-TimeSpan -Minutes 15) `
  -StartWhenAvailable `
  -RunOnlyIfNetworkAvailable `
  -MultipleInstances IgnoreNew

# 현재 로그인 사용자로 실행 (비밀번호 불필요)
$principal = New-ScheduledTaskPrincipal `
  -UserId ([System.Security.Principal.WindowsIdentity]::GetCurrent().Name) `
  -LogonType Interactive `
  -RunLevel Highest

# 등록
try {
  Register-ScheduledTask `
    -TaskName $TaskName `
    -Trigger   $trigger `
    -Action    $action `
    -Settings  $settings `
    -Principal $principal `
    -Force | Out-Null

  Write-Host ""
  Write-Host "[SUCCESS] 작업 스케줄러 등록 완료!" -ForegroundColor Green
  Write-Host ""
  Write-Host "  작업 이름  : $TaskName"           -ForegroundColor White
  Write-Host "  실행 시각  : 매일 오전 $RunAt"    -ForegroundColor White
  Write-Host "  실행 파일  : $BatFile"             -ForegroundColor White
  Write-Host "  로그 위치  : $LogDir\daily.log"   -ForegroundColor White
  Write-Host ""
  Write-Host "테스트 실행 (지금 바로 실행):"       -ForegroundColor Cyan
  Write-Host "  Start-ScheduledTask -TaskName '$TaskName'" -ForegroundColor Gray
  Write-Host ""
  Write-Host "작업 제거:"                          -ForegroundColor Cyan
  Write-Host "  Unregister-ScheduledTask -TaskName '$TaskName' -Confirm:`$false" -ForegroundColor Gray
  Write-Host ""
  Write-Host "======================================================" -ForegroundColor Cyan

} catch {
  Write-Host "[ERROR] 등록 실패: $_" -ForegroundColor Red
  Write-Host "관리자 권한으로 PowerShell을 실행한 후 다시 시도하세요." -ForegroundColor Yellow
  exit 1
}
