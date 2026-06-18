Set objFSO = CreateObject("Scripting.FileSystemObject")
strPath = objFSO.GetParentFolderName(WScript.ScriptFullName) & "\index.html"
Set objShell = CreateObject("WScript.Shell")
objShell.Run "cmd.exe /c start """" chrome --app=""" & strPath & """ --start-maximized", 0, False
