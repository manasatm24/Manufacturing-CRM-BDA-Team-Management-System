$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$nodeDir = Join-Path $root "node-v22.11.0-win-x64"
$env:Path = "$nodeDir;$env:Path"
Set-Location (Join-Path $root "client")
& (Join-Path $nodeDir "npm.cmd") run dev
