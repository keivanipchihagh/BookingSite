using System;
using System.Data.SqlClient;

namespace BookingSite
{
    public partial class responder : System.Web.UI.Page
    {
        //public const string connectionString = "Data Source = .; Initial Catalog = BookingSite; Integrated Security = True";
        public const string connectionString = "Data Source=www.keivanipchihagh.ir;Initial Catalog = xxxxxxxxxxxxxxxxxxx; Persist Security Info=True;User ID = xxxxxxxxxxxxxxxxxxx; Password=xxxxxxxxxxxxxxxxxxx";
        private SqlConnection sqlConnection;
        private SqlCommand sqlCommand;

        protected void Page_Load(object sender, EventArgs e)
        {
            Response.CacheControl = "no-cache";
            Response.AddHeader("pragma", "no-cache");
            Response.Expires = -1;

            switch (Request.QueryString["Action"])
            {
                case "check_insert":
                    try
                    {
                        sqlConnection = new SqlConnection(connectionString);    // Initialzie connection
                        sqlCommand = new SqlCommand("SELECT * FROM BookList WHERE Code = @code", sqlConnection);    // Initialize commands
                        sqlCommand.Parameters.Add(new SqlParameter("@code", Request.QueryString["Code"]));  // Add parameter
                        sqlConnection.Open();   // Open connection

                        if (sqlCommand.ExecuteReader().Read())
                            Response.Write("false");
                        else
                            Response.Write("true");
                    }
                    catch (Exception) { Response.Write("false"); }
                    finally { sqlConnection.Close(); }  // Close connection

                    break;

                case "check_update":
                    try
                    {
                        sqlConnection = new SqlConnection(connectionString);    // Initialzie connection
                        sqlCommand = new SqlCommand("SELECT * FROM BookList WHERE Code = @code", sqlConnection);    // Initialize commands
                        sqlCommand.Parameters.Add(new SqlParameter("@code", Request.QueryString["Code"]));  // Add parameter
                        sqlConnection.Open();   // Open connection

                        if (sqlCommand.ExecuteReader().Read())
                            Response.Write("true");
                        else
                            Response.Write("false");
                    }
                    catch (Exception) { Response.Write("false"); }
                    finally { sqlConnection.Close(); }  // Close connection

                    break;

                case "search":
                    try
                    {
                        sqlConnection = new SqlConnection(connectionString);    // Initialize connection
                        sqlCommand = new SqlCommand("SELECT * FROM BookList WHERE Code = @code", sqlConnection);    // Initialize command
                        sqlCommand.Parameters.Add(new SqlParameter("@code", Request.QueryString["Code"]));  // Add parameter
                        sqlConnection.Open();   // Open connection

                        SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();   // Retrieve data
                        if (sqlDataReader.Read())
                            Response.Write(sqlDataReader["Code"].ToString() + "," + sqlDataReader["Name"].ToString() + "," + sqlDataReader["Price"].ToString());
                        else
                            Response.Write("false");
                    }
                    catch (Exception) { Response.Write("false"); }
                    finally { sqlConnection.Close(); }  // Close connection

                    break;

                case "insert":
                    try
                    {
                        sqlConnection = new SqlConnection(connectionString);    // Initialize connection
                        sqlCommand = new SqlCommand("INSERT INTO BookList (Code, Name, Price) VALUES (@code, @name, @price);", sqlConnection); // Initialize command
                        sqlCommand.Parameters.Add(new SqlParameter("@code", Request.QueryString["Code"]));  // Add parameter
                        sqlCommand.Parameters.Add(new SqlParameter("@name", Request.QueryString["Name"]));  // Add parameter
                        sqlCommand.Parameters.Add(new SqlParameter("@price", Request.QueryString["Price"]));  // Add parameter
                        sqlConnection.Open();   // Open connection
                        sqlCommand.ExecuteNonQuery();   // Exeute
                        Response.Write("true");
                    }
                    catch (Exception) { Response.Write("false"); }
                    finally { sqlConnection.Close(); }  // Close connection

                    break;

                case "update":
                    try
                    {
                        sqlConnection = new SqlConnection(connectionString);    // Initialize connection
                        sqlCommand = new SqlCommand("UPDATE BookList SET code = @code, name = @name, price = @price WHERE (code = @code);", sqlConnection);  // Initialize command
                        sqlCommand.Parameters.Add(new SqlParameter("@code", Request.QueryString["Code"]));    // Add parameter
                        sqlCommand.Parameters.Add(new SqlParameter("@name", Request.QueryString["Name"]));  // Add parameter
                        sqlCommand.Parameters.Add(new SqlParameter("@price", Request.QueryString["Price"]));  // Add parameter
                        sqlConnection.Open();   // Open connection
                        sqlCommand.ExecuteNonQuery();   // Execute
                        Response.Write("true");
                    }
                    catch (Exception) { Response.Write("false"); }
                    finally { sqlConnection.Close(); }  // Close connection
                    break;

                case "delete":
                    try
                    {
                        sqlConnection = new SqlConnection(connectionString);    // Initialize connection
                        sqlCommand = new SqlCommand("DELETE FROM BookList WHERE code = @code", sqlConnection);
                        sqlCommand.Parameters.Add(new SqlParameter("@code", Request.QueryString["Code"]));    // Add parameter
                        sqlConnection.Open();   // Open connection
                        sqlCommand.ExecuteNonQuery();   // Execute
                        Response.Write("true");
                    }
                    catch (Exception) { Response.Write("false"); }
                    finally { sqlConnection.Close(); }  // Close connection
                    break;

                case "load_display":
                    try
                    {
                        sqlConnection = new SqlConnection(connectionString);    // Initialize connection
                        sqlCommand = new SqlCommand("SELECT * FROM BookList", sqlConnection);
                        sqlConnection.Open();   // Open connection

                        SqlDataReader dataReader = sqlCommand.ExecuteReader();
                        string data = "<table id=\"header\"><tr><th>Code</th><th>Name</th><th>Price</th></tr>";
                        while (dataReader.Read())
                            data += "<tr><th>" + dataReader["Code"] + "</th>" + "<th>" + dataReader["Name"] + "</th>" + "<th>" + dataReader["Price"] + "</th></tr>";

                        Response.Write(data);
                    }
                    catch (Exception) { Response.Write("false"); }
                    finally { sqlConnection.Close(); }  // Close connection
                    break;
            }
        }
    }
}