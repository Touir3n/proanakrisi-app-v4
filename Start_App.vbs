Set objFSO = CreateObject("Scripting.FileSystemObject")
strDir = objFSO.GetParentFolderName(WScript.ScriptFullName)
strURL = "file:///" & Replace(strDir, "\", "/") & "/index.html"

Set objShell = CreateObject("WScript.Shell")
objShell.Run "cmd.exe /c start """" chrome --app=""" & strURL & """ --start-maximized", 0, False
