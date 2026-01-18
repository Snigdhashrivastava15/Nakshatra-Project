# Fix PowerShell Extension Error in VS Code

## Error
```
[PSES] Server initialization failed.
Pending response rejected since connection got disposed
Connection to PowerShell Editor Services was closed
```

## Solutions (Try in order)

### Solution 1: Restart PowerShell Extension
1. Open VS Code Command Palette (`Ctrl+Shift+P`)
2. Type: `PowerShell: Restart PowerShell Session`
3. Press Enter

### Solution 2: Reload VS Code Window
1. Open Command Palette (`Ctrl+Shift+P`)
2. Type: `Developer: Reload Window`
3. Press Enter

### Solution 3: Clear PowerShell Extension Cache
1. Close VS Code completely
2. Navigate to PowerShell extension cache:
   ```
   %USERPROFILE%\.vscode\extensions\ms-vscode.powershell-*\modules\PowerShellEditorServices\
   ```
3. Delete the cache folder (or just restart VS Code)
4. Restart VS Code

### Solution 4: Disable and Re-enable Extension
1. Open Extensions (`Ctrl+Shift+X`)
2. Search for "PowerShell"
3. Click the gear icon → Disable
4. Reload VS Code
5. Re-enable the extension

### Solution 5: Check PowerShell Execution Policy
Run in PowerShell (as Administrator):
```powershell
Get-ExecutionPolicy
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Solution 6: Update PowerShell Extension
1. Open Extensions (`Ctrl+Shift+X`)
2. Search for "PowerShell"
3. If update available, click "Update"
4. Reload VS Code

### Solution 7: Use Windows Terminal Instead
If the issue persists, you can use Windows Terminal or Command Prompt:
1. Open terminal outside VS Code
2. Navigate to project: `cd C:\project\celestial-strategy-website-10095f42-main`
3. Run commands directly

## Quick Fix for Now

Since this is just a PowerShell extension issue (not your project code), you can:

1. **Use the integrated terminal directly** - The terminal should still work
2. **Run commands from external terminal** - Use Windows Terminal or Command Prompt
3. **Restart VS Code** - This often fixes the issue

The backend server should still work fine even if PowerShell extension has issues.
