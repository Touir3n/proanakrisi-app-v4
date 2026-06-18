Set objFSO = CreateObject("Scripting.FileSystemObject")
strDir = objFSO.GetParentFolderName(WScript.ScriptFullName)
strURL = "file:///" & Replace(strDir, "\", "/") & "/index.html"

Set objShellApp = CreateObject("Shell.Application")
On Error Resume Next
objShellApp.ShellExecute "chrome.exe", "--app=""" & strURL & """ --start-maximized", "", "", 1
If Err.Number <> 0 Then
    Err.Clear
    objShellApp.ShellExecute "msedge.exe", "--app=""" & strURL & """ --start-maximized", "", "", 1
End If
