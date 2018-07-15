param(
    $url = "http://irisfixessandbox.cloudapp.net"
)

Write-Host "#### Ensuring iris ci sandbox is live ####"
$totalWaitSeconds = 600
$attempts = 1

$errorMsg = "Sitefinity initialization failed!"
$ErrorActionPreference = "SilentlyContinue"
$attempt = 1
while($attempt -le $attempts)
{
	if($attempt -eq $attempts)
	{
		$ErrorActionPreference = "Stop"
	}

	$elapsed = [System.Diagnostics.Stopwatch]::StartNew()
	$statusUrl = "$url/appstatus"
	Write-Output "Attempt[$attempt] Starting Sitefinity..."
	$retryCount = 0

	try 
	{
		$retryCount++
		$response = Invoke-WebRequest $statusUrl -TimeoutSec 1600 -UseBasicParsing

		if($response.StatusCode -eq 200)
		{
			Write-Output "Sitefinity is starting..."
		}

		while($response.StatusCode -eq 200)
		{    
			Write-Output "Retry[$retryCount] Checking Sitefinity status: '$statusUrl'"
			$retryCount++

			# Checking for error status info
			$statusInfo = Invoke-RestMethod $statusUrl -TimeoutSec 1600
			$errorStatusCheck = $statusInfo.Info | Where-Object { $_.SeverityString -eq "Critical" -or $_.SeverityString -eq "Error"}
			if($errorStatusCheck)
			{
				Write-Output $errorMsg
				throw $errorStatusCheck.Message
			}

			$response = Invoke-WebRequest $statusUrl -TimeoutSec 1600 -UseBasicParsing
			if($elapsed.Elapsed.TotalSeconds -gt $totalWaitSeconds)
			{
				throw "Sitefinity did NOT start in the specified maximum time"
			}

			Start-Sleep -s 5
		 }

	} catch {
	   if($_.Exception.Response.StatusCode.Value__ -eq 404)
	   {
		   $response = Invoke-WebRequest $url -TimeoutSec 1600 -UseBasicParsing

		   if($response.StatusCode -eq 200)
		   {
				Write-Output "Sitefinity has started after $($elapsed.Elapsed.Seconds) second(s)"
		   }

		   else
		   {
				Write-Output $errorMsg
				throw $errorMsg
		   }

		} else {
		   Write-Output "Sitefinity failed to start - StatusCode: $($_.Exception.Response.StatusCode.Value__)"   
		   Write-Output $_ | Format-List -Force
		   Write-Output $_.Exception | Format-List -Force
		   throw $errorMsg
	   }
	}

	$attempt++
	Start-Sleep -s 5
}
