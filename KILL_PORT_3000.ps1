# Quick script to kill process using port 3000
# Run this if you get "EADDRINUSE: address already in use :::3000" error

Write-Host "Checking for processes using port 3000..." -ForegroundColor Cyan

$processes = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess

if ($processes) {
    Write-Host "Found processes using port 3000: $($processes -join ', ')" -ForegroundColor Yellow
    
    foreach ($pid in $processes) {
        try {
            $proc = Get-Process -Id $pid -ErrorAction Stop
            Write-Host "Stopping process $pid ($($proc.ProcessName))..." -ForegroundColor Yellow
            Stop-Process -Id $pid -Force
            Write-Host "✅ Process $pid stopped" -ForegroundColor Green
        } catch {
            Write-Host "⚠️ Could not stop process $pid : $_" -ForegroundColor Red
        }
    }
    
    Start-Sleep -Seconds 2
    
    # Verify port is free
    $remaining = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
    if ($remaining) {
        Write-Host "⚠️ Port 3000 still in use by: $($remaining.OwningProcess -join ', ')" -ForegroundColor Red
    } else {
        Write-Host "✅ Port 3000 is now free!" -ForegroundColor Green
    }
} else {
    Write-Host "✅ Port 3000 is free" -ForegroundColor Green
}
