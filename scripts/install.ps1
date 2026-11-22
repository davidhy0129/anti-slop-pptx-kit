<#
.SYNOPSIS
Installs anti-slop-pptx-kit into the current project or globally for Antigravity, Claude Code, Codex, Cursor, and Gemini CLI.
#>
param(
    [ValidateSet("all", "antigravity", "claude", "codex", "cursor", "gemini")]
    [string]$Target = "all",

    [ValidateSet("project", "global")]
    [string]$Scope = "project",

    [string]$Destination = (Get-Location).Path,

    [switch]$Force
)

$ErrorActionPreference = "Stop"
$KitRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)

function Copy-DirContents {
    param([string]$Source, [string]$Dest)
    if (-not (Test-Path $Source)) { return }
    New-Item -ItemType Directory -Force -Path $Dest | Out-Null
    Copy-Item -Path (Join-Path $Source "*") -Destination $Dest -Recurse -Force
}

function Copy-FileSafe {
    param([string]$Source, [string]$Dest, [switch]$Overwrite)
    if (-not (Test-Path $Source)) { return }
    $parent = Split-Path -Parent $Dest
    New-Item -ItemType Directory -Force -Path $parent | Out-Null
    if ((Test-Path $Dest) -and -not $Overwrite) {
        Write-Host "  [skip] $Dest already exists (use -Force to overwrite)" -ForegroundColor DarkGray
    } else {
        Copy-Item -Path $Source -Destination $Dest -Force
        Write-Host "  [ok]   $Dest" -ForegroundColor Green
    }
}

Write-Host "`n=== Installing anti-slop-pptx-kit (Target: $Target | Scope: $Scope) ===" -ForegroundColor Cyan

if ($Scope -eq "global") {
    $HomeDir = $env:USERPROFILE
    if ($Target -in @("all", "antigravity")) {
        Copy-DirContents (Join-Path $KitRoot "skills") (Join-Path $HomeDir ".agents\skills")
        Copy-DirContents (Join-Path $KitRoot "skills") (Join-Path $HomeDir ".gemini\antigravity\skills")
        Write-Host "  [ok]   Antigravity global PPTX skills installed" -ForegroundColor Green
    }
    if ($Target -in @("all", "claude")) {
        Copy-DirContents (Join-Path $KitRoot "skills") (Join-Path $HomeDir ".claude\skills")
        Copy-DirContents (Join-Path $KitRoot "agents") (Join-Path $HomeDir ".claude\agents")
        Write-Host "  [ok]   Claude Code global PPTX skills & agents installed" -ForegroundColor Green
    }
    if ($Target -in @("all", "codex")) {
        Copy-DirContents (Join-Path $KitRoot "skills") (Join-Path $HomeDir ".codex\skills")
        Write-Host "  [ok]   Codex global PPTX skills installed" -ForegroundColor Green
    }
    if ($Target -in @("all", "gemini")) {
        Copy-DirContents (Join-Path $KitRoot "skills") (Join-Path $HomeDir ".gemini\skills")
        Write-Host "  [ok]   Gemini CLI global PPTX skills installed" -ForegroundColor Green
    }
    Write-Host "`nDone! Global PPTX skills installed.`n" -ForegroundColor Cyan
    exit 0
}

$DestRoot = (Resolve-Path $Destination).Path

if ($Target -in @("all", "antigravity", "codex")) {
    Copy-DirContents (Join-Path $KitRoot "skills") (Join-Path $DestRoot ".agents\skills")
    Copy-FileSafe (Join-Path $KitRoot "AGENTS.md") (Join-Path $DestRoot "AGENTS.md") -Overwrite:$Force
    Write-Host "  [ok]   .agents/skills & AGENTS.md ready" -ForegroundColor Green
}

if ($Target -in @("all", "claude")) {
    Copy-DirContents (Join-Path $KitRoot "skills") (Join-Path $DestRoot ".claude\skills")
    Copy-DirContents (Join-Path $KitRoot "agents") (Join-Path $DestRoot ".claude\agents")
    Copy-FileSafe (Join-Path $KitRoot "CLAUDE.md") (Join-Path $DestRoot "CLAUDE.md") -Overwrite:$Force
    Write-Host "  [ok]   .claude/skills, .claude/agents & CLAUDE.md ready" -ForegroundColor Green
}

if ($Target -in @("all", "cursor")) {
    Copy-FileSafe (Join-Path $KitRoot ".cursor\rules\anti-slop-pptx-kit.mdc") (Join-Path $DestRoot ".cursor\rules\anti-slop-pptx-kit.mdc") -Overwrite:$true
}

if ($Target -in @("all", "gemini")) {
    Copy-DirContents (Join-Path $KitRoot "skills") (Join-Path $DestRoot ".gemini\skills")
    Copy-FileSafe (Join-Path $KitRoot "GEMINI.md") (Join-Path $DestRoot "GEMINI.md") -Overwrite:$Force
}

Copy-DirContents (Join-Path $KitRoot "workflows") (Join-Path $DestRoot "workflows")
Copy-DirContents (Join-Path $KitRoot "prompts") (Join-Path $DestRoot "prompts")
Copy-DirContents (Join-Path $KitRoot "agents") (Join-Path $DestRoot "agents")
Copy-DirContents (Join-Path $KitRoot "templates") (Join-Path $DestRoot "templates")
Copy-FileSafe (Join-Path $KitRoot "scripts\audit-pptx-code.mjs") (Join-Path $DestRoot "scripts\audit-pptx-code.mjs") -Overwrite:$true

Write-Host "`nDone! Run 'node scripts/audit-pptx-code.mjs .' in $DestRoot`n" -ForegroundColor Cyan
