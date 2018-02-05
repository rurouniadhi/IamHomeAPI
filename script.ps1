$server = "NVNotebook0004"
$Database = "IamHomeContext"

$Connection = New-Object System.Data.SQLClient.SQLConnection
$Connection.ConnectionString = "server='$Server';database='$Database';trusted_connection=true;"
$Connection.Open()
$Command = New-Object System.Data.SQLClient.SQLCommand
$Command.Connection = $Connection
$sql ="UPDATE Users set Status = 0" 
$Command.CommandText = $sql
$Command.ExecuteReader()
$Connection.Close()