@echo off
setlocal
set "qa_node=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if not exist "%qa_node%" set "qa_node=node"
"%qa_node%" "%~dp0run.cjs" %*
set "qa_exit=%errorlevel%"
echo.
echo Results are stored in artifacts\country-qa under the BFSC workspace.
echo Exit code: %qa_exit%
pause
exit /b %qa_exit%
