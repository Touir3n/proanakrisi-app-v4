Set objFSO = CreateObject("Scripting.FileSystemObject")
strPath = objFSO.GetParentFolderName(WScript.ScriptFullName) & "\index.html"
Set objShell = CreateObject("WScript.Shell")
On Error Resume Next
objShell.Run "msedge --app=""" & strPath & """ --start-maximized", 1, False
If Err.Number <> 0 Then
    Err.Clear
    objShell.Run "chrome --app=""" & strPath & """ --start-maximized", 1, False
End If
