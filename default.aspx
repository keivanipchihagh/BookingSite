<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="BookingSite._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>BookingSite | Home</title>
    <link href="StyleSheets/styleSheet.css" type="text/css" rel="stylesheet" />
    <script src="Scripts/JavaScript.js" type="text/javascript"></script>
    <link href="favicon.ico" rel="icon" type="image/gif" />
    <!-- BootStrap CSS, JavaScript, JQuera Libraries -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>
<body id="body" onload="setCenter()" onresize="setCenter()">
    <div class="col-sm-4"></div>
    <div class="col-sm-4">
        <div id="home_panel" class="panel" style="margin-bottom: 0px">
            <div style="width: 100%; height: 10%">
                <h2 style="margin-top: 0px; font-weight: bold"><span style="font-size: 15px">───────────────</span> <span style="color: rgba(0, 0, 0, 0.70)">Home</span> <span style="font-size: 15px">───────────────</span></h2>
            </div>
            <span style="font-size: 13px; font-weight: bold; margin-bottom: 1%">A BookingSite simulation using <u>ASP.NET</u>, <u>Ajax</u> and <u>BootStrap</u></span>
            <div class="container" style="width: 100%; margin-bottom: 15px; font-size: 10px">
                <input id="insert" class="button" type="button" name="insert" value="Insert" onclick="entry('default.aspx')" />
                <input id="update" class="button" type="button" name="update" value="Update / Delete" onclick="search()" />
                <input id="display" class="button" type="button" name="delete" value="Display" onclick="display()" />
            </div>
            <form id="home_form" name="home_form" method="post" action="#"></form>
        </div>
        <div style="color: white; padding: 5px; text-align: right; font-size: 10px">Developed By: Keivan Ipchi Hagh</div>
    </div>
    <div class="col-sm-4"></div>
</body>
</html>