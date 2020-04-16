<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="preview.aspx.cs" Inherits="BookingSite.preview" %>

<!DOCTYPE html>

<html id="html" xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>BookingSite | Preview</title>
    <link href="StyleSheets/styleSheet.css" type="text/css" rel="stylesheet" />
    <script src="Scripts/JavaScript.js" type="text/javascript"></script>
    <link href="favicon.ico" rel="icon" type="image/gif" />
    <!-- BootStrap CSS, JavaScript, JQuera Libraries -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>
<body onload="setCenter()" onresize="setCenter()">
    <div class="col-sm-4"></div>
    <div class="col-sm-4">
        <div id="home_panel" class="panel" style="margin-bottom: 0px">
            <div style="width: 100%; height: 10%">
                <h2 style="margin-top: 0px; font-weight: bold"><span style="font-size: 15px">───────────────</span> <span style="color: rgba(0, 0, 0, 0.70)">Preview</span> <span style="font-size: 15px">───────────────</span></h2>
            </div>
            <span style="font-size: 13px; font-weight: bold; margin-bottom: 1%">Make your last-minute changes and submit your request</span>
            <div class="container" style="width: 80%">
                <form id="submit_form" runat="server" method="post" action="#">
                    <input id="code" name="code" type="hidden" runat="server" value="" />
                    <input id="name" name="name" type="hidden" runat="server" value="" />
                    <input id="price" name="price" type="hidden" runat="server" value="" />
                    <input id="action" name="action" type="hidden" runat="server" value="" />
                    <input id="fromPage" name="fromPage" type="hidden" runat="server" value="" />
                </form>
                <span style="text-align: left; display: block; margin: 10px; font-size: 1vw">Book Code: <span style="color: black; font-weight: bold;" id="codeSpan" runat="server"></span></span>
                <span style="text-align: left; display: block; margin: 10px; font-size: 1vw">Book Name: <span style="color: black; font-weight: bold;" id="nameSpan" runat="server"></span></span>
                <span style="text-align: left; display: block; margin: 10px; font-size: 1vw">Book Price: <span style="color: black; font-weight: bold;" id="priceSpan" runat="server"></span></span>
            </div>
            <span id="info" runat="server" style="font-size: 13px; font-weight: bold; margin-bottom: 1%"></span>            
            <div class="container" style="width: 100%; margin-bottom: 15px">
                <div class="col-md-6">
                    <input id="back" class="button" name="back" type="submit" value="Back" runat="server" style="width: 100%" onclick="backPreview(document.getElementById('code').value, document.getElementById('name').value, document.getElementById('price').value, document.getElementById('action').value)" />
                </div>
                <div class="col-md-6">
                    <input id="submit" class="button" name="submit" type="submit" value="Submit" runat="server" style="width: 100%" onclick="submit(document.getElementById('action').value)" /></div>
            </div>     
        </div>
        <div style="color: white; padding: 5px; text-align: right; font-size: 10px">
            Developed By: Keivan Ipchi Hagh
        </div>
    </div>
    <div class="col-sm-4"></div>
</body>
</html>
