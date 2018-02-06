$conn = New-Object System.Data.SqlClient.SqlConnection("Data Source=(localdb)\MSSQLLocalDB; Initial Catalog=IamHomeContext-20180118160102; Integrated Security=true")  
$conn.Open()
$sqlcmd = new-object "System.Data.SqlClient.SqlCommand"
$sqlcmd.connection = $conn
$sqlcmd.CommandText = “UPDATE Users SET Status = '0'”
$rowsAffected = $sqlcmd.ExecuteNonQuery()
$conn.Close()