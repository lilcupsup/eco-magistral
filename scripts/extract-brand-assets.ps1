Add-Type -AssemblyName System.Drawing

$sourcePath = 'C:\Users\SAKO\Desktop\emlogo.png'
$destination = Join-Path $PSScriptRoot '..\public\images\brand'
$source = [System.Drawing.Bitmap]::FromFile($sourcePath)

function Save-BrandAsset {
  param(
    [string]$Name,
    [System.Drawing.Rectangle]$Crop,
    [bool]$WhiteMark = $false
  )

  $canvas = New-Object System.Drawing.Bitmap $Crop.Width, $Crop.Height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

  for ($y = 0; $y -lt $Crop.Height; $y++) {
    for ($x = 0; $x -lt $Crop.Width; $x++) {
      $pixel = $source.GetPixel($Crop.X + $x, $Crop.Y + $y)
      $spread = [Math]::Max($pixel.R, [Math]::Max($pixel.G, $pixel.B)) - [Math]::Min($pixel.R, [Math]::Min($pixel.G, $pixel.B))

      if ($WhiteMark) {
        $luminance = (0.2126 * $pixel.R) + (0.7152 * $pixel.G) + (0.0722 * $pixel.B)
        if ($luminance -lt 75) {
          $canvas.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
        } else {
          $alpha = [Math]::Min(255, [Math]::Round(($luminance - 60) * 1.31))
          $canvas.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, 255, 255, 255))
        }
      } elseif ($pixel.R -gt 215 -and $pixel.G -gt 215 -and $pixel.B -gt 210 -and $spread -lt 34) {
        $canvas.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, $pixel.R, $pixel.G, $pixel.B))
      } else {
        $canvas.SetPixel($x, $y, $pixel)
      }
    }
  }

  $canvas.Save((Join-Path $destination $Name), [System.Drawing.Imaging.ImageFormat]::Png)
  $canvas.Dispose()
}

Save-BrandAsset -Name 'eco-magistral-horizontal.png' -Crop (New-Object System.Drawing.Rectangle 36, 592, 400, 114)
Save-BrandAsset -Name 'eco-magistral-compact.png' -Crop (New-Object System.Drawing.Rectangle 494, 595, 138, 122)
Save-BrandAsset -Name 'eco-magistral-monochrome.png' -Crop (New-Object System.Drawing.Rectangle 690, 615, 325, 82)
Save-BrandAsset -Name 'eco-magistral-reversed.png' -Crop (New-Object System.Drawing.Rectangle 1044, 577, 378, 162) -WhiteMark $true

$source.Dispose()
