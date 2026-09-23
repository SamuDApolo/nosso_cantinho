param(
    [switch]$Run
)

function ToSafeName($name) {
    $ext = [IO.Path]::GetExtension($name)
    $base = [IO.Path]::GetFileNameWithoutExtension($name)
    $newBase = $base.ToLower()
    $newBase = $newBase -replace '\s+','-'
    $newBase = $newBase -replace '[:\.]','-'
    $newBase = $newBase -replace '\bat\b',''
    $newBase = $newBase -replace '[^a-z0-9\-]',''
    $newBase = $newBase -replace '-+','-'
    $newBase = $newBase -replace '^-|-$',''
    return ($newBase + $ext).ToLower()
}

Write-Output "Running in: $(Get-Location)"

# Fotos
Get-ChildItem -Path .\FOTOS_1 -File -ErrorAction SilentlyContinue | ForEach-Object {
    $old = $_.Name
    $new = ToSafeName $old
    if ($old -ne $new) {
        if ($Run) {
            Rename-Item -LiteralPath $_.FullName -NewName $new -ErrorAction Stop
            Write-Output "Renamed: $old -> $new"
        } else {
            Write-Output "DRY-RUN: $old -> $new"
        }
    }
}

# Vídeos
Get-ChildItem -Path .\VIDEOS_1 -File -ErrorAction SilentlyContinue | ForEach-Object {
    $old = $_.Name
    $new = ToSafeName $old
    if ($old -ne $new) {
        if ($Run) {
            Rename-Item -LiteralPath $_.FullName -NewName $new -ErrorAction Stop
            Write-Output "Renamed: $old -> $new"
        } else {
            Write-Output "DRY-RUN: $old -> $new"
        }
    }
}

Write-Output "Done. To actually rename files run: .\\rename-media.ps1 -Run (in PowerShell)"
