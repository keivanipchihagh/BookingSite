// Adjust Centeral Point For Panel
function setCenter() {
    var screenHight = screen.availHeight || document.availHeight || document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
    if (window.location.href.includes("register"))
        screenHight *= 0.15;
    else
        screenHight *= 0.2;
    document.getElementsByClassName('panel')[0].style.marginTop = screenHight + 'px';
}

// Validate On Key Up
function validate(object, name) {
    var regexPattern = /^[0-9]+$/;
    switch (name) {
        case 'code':
            if (object.value.indexOf('-') !== -1) {
                object.style.outline = '1px solid #ff0000';
                return false;
            } else
                object.style.outline = '1px solid #5cb85c';
            break;
        case 'name':
            if (regexPattern.test(object.value) === true || object.value.indexOf('-') !== -1) {
                object.style.outline = '1px solid #ff0000';
                return false;
            } else
                object.style.outline = '1px solid #5cb85c';
            break;
        case 'price':
            if (object.value.indexOf('-') !== -1) {
                object.style.outline = '1px solid #ff0000';
                return false;
            } else
                object.style.outline = '1px solid #5cb85c';
            break;
    }

    if (object.value === '') {
        object.style.outline = '1px solid #ccc';
        return false;
    }

    return true;
}

// Validate On Submit
function validateSubmit(page, object = null) {
    
    var request = new XMLHttpRequest(); // Create HTTP request

    switch (page) {
        case 'entry.aspx':
            if (validate(document.getElementById('price'), 'price') && validate(document.getElementById('name'), 'name') && validate(document.getElementById('code'), 'code')) {

                if (document.getElementById('fromPage').value === 'default.aspx')
                    request.open('GET', 'responder.aspx?Action=check_insert&Code=' + document.getElementById('code').value, true);   // Initialize request
                else
                    request.open('GET', 'responder.aspx?Action=check_update&Code=' + document.getElementById('code').value, true);   // Initialize request
                request.send(); // Send request
                
                var success = true;
                request.onreadystatechange = function () {
                    if (request.readyState === 4 && request.status === 200) {
                        if (request.responseText === 'true') {  // Records not found!

                            if (document.getElementById('fromPage').value === 'default.aspx')
                                document.getElementById('action').value = 'insert';
                            else
                                document.getElementById('action').value = 'update';

                            document.getElementById('fromPage').value = 'entry.aspx';
                            document.getElementById('entry_form').submit();
                            //preview();
                            
                        } else {
                            alert('Another record with the same \'Code Book\' already exists in the database. Please enter a different one.');
                            document.getElementById('code').value = '';
                            validate(document.getElementById('code'), 'code');
                        }
                    } else
                        success = false;
                };

                if (success === false)
                    alert('Something went wrong while processing you request. Probem has been reported and we will fix it ASAP!');

            } else {
                if (document.getElementById('price').value === '')
                    document.getElementById('price').style.outline = '1px solid #ff0000';
                if (document.getElementById('name').value === '')
                    document.getElementById('name').style.outline = '1px solid #ff0000';
                if (document.getElementById('code').value === '')
                    document.getElementById('code').style.outline = '1px solid #ff0000';

                alert('There is something wrong with your enteries (Maked as red). Fix them and try again.');
            }
            break;        

        case 'search.aspx':
            if (validate(document.getElementById('code'), 'code')) {
                request = new XMLHttpRequest();
                request.open('Get', 'responder.aspx?Action=search&Code=' + document.getElementById('code').value, true);    // Initialize request
                request.send(); // Send request

                success = true;
                request.onreadystatechange = function () {
                    if (request.readyState === 4 && request.status === 200) {                        
                        if (request.responseText !== 'false') { // Records found!

                            var data = request.responseText.split(','); // Get results as array           
                            document.getElementById('name').value = data[1];
                            document.getElementById('price').value = data[2];
                            document.getElementById('action').value = object.id;
                            document.getElementById('fromPage').value = 'search.aspx';

                            if (object.id === 'delete') {
                                document.getElementById('search_form').action = 'preview.aspx';
                                document.getElementById('search_form').submit();
                                //preview();
                            } else
                                entry('search.aspx', data);

                        } else {
                            alert('No records found in the database. Please enter a different one.');
                            document.getElementById('code').value = '';
                            validate(document.getElementById('code'), 'code');
                            goPreview = false;
                        }
                    } else
                        success = false;
                };
                if (success === false)
                    alert('Something went wrong while processing you request. Probem has been reported and we will fix it ASAP!');
            } else {
                if (document.getElementById('code').value === '')
                    document.getElementById('code').style.outline = '1px solid #ff0000';

                alert('There is something wrong with your entry (Maked as red). Fix it and try again.');
            }
            break;
    }
}

// Submit
function submit(action) {

    var request = new XMLHttpRequest();
    var code = document.getElementById('code').value;
    var name = document.getElementById('name').value;
    var price = document.getElementById('price').value;
    request.open('GET', 'responder.aspx?Action=' + action + "&Code=" + code + "&Name=" + name + "&Price=" + price, true);
    request.send();

    var success = true;
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            if (request.responseText === 'true')
                document.getElementById('home_panel').innerHTML = '<div style="width: 100%; height: 10%"><h2 style="margin-top: 0px; font-weight: bold"><span style="font-size: 15px">───────────────</span> <span style="color: rgba(0, 0, 0, 0.70)">Success</span> <span style="font-size: 15px">───────────────</span></h2></div><span style="font-size: 13px; font-weight: bold; margin-bottom: 1%">Your request has been processed successfully. You may leave now</span><div class="container" style="width: 100%; margin-bottom: 15px; font-size: 10px"><input id="Submit1" class="button" name="back" type="submit" value="Back to Home" onclick="home(\'success\')" /></div>';
            else
                success = false;
        }
    };

    if (success === false)
        alert('Something went wrong while processing you request. Probem has been reported and we will fix it ASAP!');
}

function display() {
    var request = new XMLHttpRequest();
    request.open('GET', 'responder.aspx?Action=load_display', true);
    request.send();

    var success = true;
    request.onreadystatechange = function () {
        if (request.status === 200 && request.readyState === 4) {
            if (request.responseText !== 'false') {
                document.getElementById('home_panel').innerHTML = '<div style="width: 100%; height: 10%"><h2 style="margin-top: 0px; font-weight: bold"><span style="font-size: 15px">───────────────</span> <span style="color: rgba(0, 0, 0, 0.70)">Display</span> <span style="font-size: 15px">───────────────</span></h2></div><span style="font-size: 13px; font-weight: bold; margin-bottom: 1%">These are all the records we could find in the database</span><div id="table_display" name="table_display" runat="server" class="container" style="width: 80%"></div><span id="info" runat="server" style="font-size: 13px; font-weight: bold; margin-bottom: 1%"></span><div class="container" style="width: 100%; margin-bottom: 15px"><input id="back" class="button" name="back" type="submit" value="Back" runat="server" onclick="home()" /></div>';
                document.getElementById('home_panel').style.marginTop = '30px';
                document.getElementById('table_display').innerHTML = request.responseText;
            } else
                success = false;
        }
    };

    if (success === false)
        alert('Something went wrong while processing you request. Probem has been reported and we will fix it ASAP!');
}

function search() {
    document.getElementById('home_panel').innerHTML = '<div style="width: 100%; height: 10%"><h2 style="margin-top: 0px; font-weight: bold"><span style="font-size: 15px">─────────────</span> <span style="color: rgba(0, 0, 0, 0.70)">Search</span> <span style="font-size: 15px">─────────────</span></h2></div><span style="font-size: 13px; font-weight: bold; margin-bottom: 1%">Search your book in our database using its <i>Book Code</i></span><div class="container" style="width: 100%; margin-bottom: 15px"><form id="search_form" name="search_form" runat="server" method="post" action="#"><input id="code" name="code" class="textBox" type="number" placeholder="Book Code" onkeyup="validate(this, \'code\')" required="required" style="width: 70%" /><input id="name" name="name" runat="server" type="hidden" /><input id="price" name="price" runat="server" type="hidden" /><input id="action" name="action" type="hidden" runat="server" value="" /><input id="fromPage" name="fromPage" type="hidden" runat="server" value="" /></form></div><div class="container" style="width: 100%; margin-bottom: 15px"><div class="col-md-4"><input id="delete" class="button" name="submit" type="submit" value="Delete" style="width: 100%;" onclick="validateSubmit(\'search.aspx\', this)" /></div><div class="col-md-4"><input id="back" class="button" name="submit" type="submit" value="Back" style="width: 100%;" onclick="home()" /></div><div class="col-md-4"><input id="update" class="button" name="submit" type="submit" value="Update" style="width: 100%;" onclick="validateSubmit(\'search.aspx\', this)" /></div></div>';
}

function entry(URL, data = null) {
    if (URL === 'default.aspx') {
        document.getElementById('home_panel').innerHTML = '<div style="width: 100%; height: 10%"><h2 style="margin-top: 0px; font-weight: bold"><span style="font-size: 15px">──────────────</span> <span id="title" runat="server" style="color: rgba(0, 0, 0, 0.70)">Insert</span> <span style="font-size: 15px">──────────────</span></h2></div><span id="description" runat="server" style="font-size: 13px; font-weight: bold; margin-bottom: 1%">Insert your book with a unique <i>Book Code</i></span><div class="container" style="width: 100%"><form id="entry_form" name="entry_form" action="preview.aspx" method="post" runat="server"><input id="code" name="code" class="textBox" runat="server" type="number" placeholder="Book Code" onkeyup="validate(this, \'code\')" required="required" /><input id="name" name="name" class="textBox" runat="server" type="text" placeholder="Book Name" onkeyup="validate(this, \'name\')" required="required" /><input id="price" name="price" class="textBox" runat="server" type="number" placeholder="Book Price" onkeyup="validate(this, \'price\')" required="required" /><input id="action" name="action" type="hidden" runat="server" value="insert" /><input id="fromPage" name="fromPage" type="hidden" runat="server" value="" /></form></div><div class="container" style="width: 100%; margin-bottom: 15px"><div class="col-md-6"><input id="back" class="button" name="back" runat="server" type="submit" value="Back" style="width: 100%" onclick="home()" /></div><div class="col-md-6"><input id="submit" class="button" name="submit" runat="server" type="submit" value="Preview" style="width: 100%" onclick="validateSubmit(\'entry.aspx\')" /></div></div>';
        document.getElementById('fromPage').value = 'default.aspx';
        document.getElementById('code').value = data[0];
        document.getElementById('name').value = data[1];
        document.getElementById('price').value = data[2];
    } else {
        document.getElementById('home_panel').innerHTML = '<div style="width: 100%; height: 10%"><h2 style="margin-top: 0px; font-weight: bold"><span style="font-size: 15px">──────────────</span> <span id="title" runat="server" style="color: rgba(0, 0, 0, 0.70)">Update</span> <span style="font-size: 15px">──────────────</span></h2></div><span id="description" runat="server" style="font-size: 13px; font-weight: bold; margin-bottom: 1%">Update your record information<i>Book Code</i></span><div class="container" style="width: 100%"><form id="entry_form" name="entry_form" action="preview.aspx" method="post" runat="server"><input id="code" name="code" class="textBox" runat="server" type="number" placeholder="Book Code" onkeyup="validate(this, \'code\')" required="required" /><input id="name" name="name" class="textBox" runat="server" type="text" placeholder="Book Name" onkeyup="validate(this, \'name\')" required="required" /><input id="price" name="price" class="textBox" runat="server" type="number" placeholder="Book Price" onkeyup="validate(this, \'price\')" required="required" /><input id="action" name="action" type="hidden" runat="server" value="update" /><input id="fromPage" name="fromPage" type="hidden" runat="server" value="" /></form></div><div class="container" style="width: 100%; margin-bottom: 15px"><div class="col-md-6"><input id="back" class="button" name="back" runat="server" type="submit" value="Back" style="width: 100%" onclick="search()" /></div><div class="col-md-6"><input id="submit" class="button" name="submit" runat="server" type="submit" value="Preview" style="width: 100%" onclick="validateSubmit(\'entry.aspx\')" /></div></div>';        
        document.getElementById('code').value = data[0];
        document.getElementById('name').value = data[1];
        document.getElementById('price').value = data[2];
        document.getElementById('fromPage').value = 'search.aspx';
        document.getElementById('code').setAttribute("readonly", "true");
    }
}

function home(page = null) {
    if (page !== 'success') {
        document.getElementById('home_panel').innerHTML = '<div style="width: 100%; height: 10%"><h2 style="margin-top: 0px; font-weight: bold"><span style="font-size: 15px">───────────────</span> <span style="color: rgba(0, 0, 0, 0.70)">Home</span> <span style="font-size: 15px">───────────────</span></h2></div><span style="font-size: 13px; font-weight: bold; margin-bottom: 1%">A BookingSite simulation using <u>ASP.NET</u>, <u>Ajax</u> and <u>BootStrap</u></span><div class="container" style="width: 100%; margin-bottom: 15px; font-size: 10px"><input id="insert" class="button" type="button" name="insert" value="Insert" onclick="entry(\'default.aspx\')" /><input id="update" class="button" type="button" name="update" value="Update / Delete" onclick="search()" /><input id="display" class="button" type="button" name="delete" value="Display" onclick="display()" /></div></div>';
        setCenter();
    } else {
        document.getElementById('home_panel').innerHTML = '<div style="width: 100%; height: 10%"><h2 style="margin-top: 0px; font-weight: bold"><span style="font-size: 15px">───────────────</span> <span style="color: rgba(0, 0, 0, 0.70)">Home</span> <span style="font-size: 15px">───────────────</span></h2></div><span style="font-size: 13px; font-weight: bold; margin-bottom: 1%">A BookingSite simulation using <u>ASP.NET</u>, <u>Ajax</u> and <u>BootStrap</u></span><div class="container" style="width: 100%; margin-bottom: 15px; font-size: 10px"><input id="insert" class="button" type="button" name="insert" value="Insert" onclick="entry(\'default.aspx\')" /><input id="update" class="button" type="button" name="update" value="Update / Delete" onclick="search()" /><input id="display" class="button" type="button" name="delete" value="Display" onclick="display()" /></div></div>';
        setCenter();
    }
}

function backPreview(code, name, price, action) {
    if (action === 'insert') {
        document.getElementById('home_panel').innerHTML = '<div style="width: 100%; height: 10%"><h2 style="margin-top: 0px; font-weight: bold"><span style="font-size: 15px">──────────────</span> <span id="title" runat="server" style="color: rgba(0, 0, 0, 0.70)">Insert</span> <span style="font-size: 15px">──────────────</span></h2></div><span id="description" runat="server" style="font-size: 13px; font-weight: bold; margin-bottom: 1%">Insert your book with a unique <i>Book Code</i></span><div class="container" style="width: 100%"><form id="entry_form" name="entry_form" action="preview.aspx" method="post" runat="server"><input id="code" name="code" class="textBox" runat="server" type="number" placeholder="Book Code" onkeyup="validate(this, \'code\')" required="required" /><input id="name" name="name" class="textBox" runat="server" type="text" placeholder="Book Name" onkeyup="validate(this, \'name\')" required="required" /><input id="price" name="price" class="textBox" runat="server" type="number" placeholder="Book Price" onkeyup="validate(this, \'price\')" required="required" /><input id="action" name="action" type="hidden" runat="server" value="insert" /><input id="fromPage" name="fromPage" type="hidden" runat="server" value="" /></form></div><div class="container" style="width: 100%; margin-bottom: 15px"><div class="col-md-6"><input id="back" class="button" name="back" runat="server" type="submit" value="Back" style="width: 100%" onclick="home()" /></div><div class="col-md-6"><input id="submit" class="button" name="submit" runat="server" type="submit" value="Preview" style="width: 100%" onclick="validateSubmit(\'entry.aspx\')" /></div></div>';
        document.getElementById('fromPage').value = 'default.aspx';
        document.getElementById('code').value = code;
        document.getElementById('name').value = name;
        document.getElementById('price').value = price;
    } else if (action === 'update') {
        document.getElementById('home_panel').innerHTML = '<div style="width: 100%; height: 10%"><h2 style="margin-top: 0px; font-weight: bold"><span style="font-size: 15px">──────────────</span> <span id="title" runat="server" style="color: rgba(0, 0, 0, 0.70)">Update</span> <span style="font-size: 15px">──────────────</span></h2></div><span id="description" runat="server" style="font-size: 13px; font-weight: bold; margin-bottom: 1%">Update your record information<i>Book Code</i></span><div class="container" style="width: 100%"><form id="entry_form" name="entry_form" action="preview.aspx" method="post" runat="server"><input id="code" name="code" class="textBox" runat="server" type="number" placeholder="Book Code" onkeyup="validate(this, \'code\')" required="required" /><input id="name" name="name" class="textBox" runat="server" type="text" placeholder="Book Name" onkeyup="validate(this, \'name\')" required="required" /><input id="price" name="price" class="textBox" runat="server" type="number" placeholder="Book Price" onkeyup="validate(this, \'price\')" required="required" /><input id="action" name="action" type="hidden" runat="server" value="update" /><input id="fromPage" name="fromPage" type="hidden" runat="server" value="" /></form></div><div class="container" style="width: 100%; margin-bottom: 15px"><div class="col-md-6"><input id="back" class="button" name="back" runat="server" type="submit" value="Back" style="width: 100%" onclick="search()" /></div><div class="col-md-6"><input id="submit" class="button" name="submit" runat="server" type="submit" value="Preview" style="width: 100%" onclick="validateSubmit(\'entry.aspx\')" /></div></div>';
        document.getElementById('code').value = code;
        document.getElementById('name').value = name;
        document.getElementById('price').value = price;
        document.getElementById('fromPage').value = 'search.aspx';
        document.getElementById('code').setAttribute("readonly", "true");
    } else
        search();
}

function preview() {

    var code;
    var name;
    var price;    

    if (document.getElementById('action').value === 'delete') {       

        request = new XMLHttpRequest();
        request.open('Get', 'responder.aspx?Action=search&Code=' + document.getElementById('code').value, true);    // Initialize request
        request.send(); // Send request

        success = true;
        request.onreadystatechange = function () {
            if (request.status === 200 && request.readyState === 4) {
                var data = request.responseText.split(','); // Get results as array           
                code = data[0];
                name = data[1];
                price = data[2];
            } else
                success = false;
        };

        if (success === false)
            alert('Something went wrong while processing you request. Probem has been reported and we will fix it ASAP!');
    } else {
        code = document.getElementById('code').value;
        name = document.getElementById('name').value;
        price = document.getElementById('price').value;
        action = document.getElementById('action').value;
    }

    document.getElementById('home_panel').innerHTML = '<div style="width: 100%; height: 10%"><h2 style="margin-top: 0px; font-weight: bold"><span style="font-size: 15px">───────────────</span> <span style="color: rgba(0, 0, 0, 0.70)">Preview</span> <span style="font-size: 15px">───────────────</span></h2></div><span style="font-size: 13px; font-weight: bold; margin-bottom: 1%">Make your last-minute changes and submit your request</span><div class="container" style="width: 80%"><form id="submit_form" runat="server" method="post" action="#"><input id="code" name="code" type="hidden" runat="server" value="" /><input id="name" name="name" type="hidden" runat="server" value="" /><input id="price" name="price" type="hidden" runat="server" value="" /><input id="action" name="action" type="hidden" runat="server" value="" /><input id="fromPage" name="fromPage" type="hidden" runat="server" value="" /></form><span style="text-align: left; display: block; margin: 10px; font-size: 1vw">Book Code: <span style="color: black; font-weight: bold;" id="codeSpan" runat="server"></span></span><span style="text-align: left; display: block; margin: 10px; font-size: 1vw">Book Name: <span style="color: black; font-weight: bold;" id="nameSpan" runat="server"></span></span><span style="text-align: left; display: block; margin: 10px; font-size: 1vw">Book Price: <span style="color: black; font-weight: bold;" id="priceSpan" runat="server"></span></span></div><span id="info" runat="server" style="font-size: 13px; font-weight: bold; margin-bottom: 1%"></span><div class="container" style="width: 100%; margin-bottom: 15px"><div class="col-md-6"><input id="back" class="button" name="back" type="submit" value="Back" runat="server" style="width: 100%" onclick="backPreview(document.getElementById(\'code\').value, document.getElementById(\'name\').value, document.getElementById(\'price\').value, document.getElementById(\'action\').value)" /></div><div class="col-md-6"><input id="submit" class="button" name="submit" type="submit" value="Submit" runat="server" style="width: 100%" onclick="submit(document.getElementById(\'action\').value)" /></div></div>';
    document.getElementById('code').value = code;
    document.getElementById('name').value = name;
    document.getElementById('price').value = price;
    document.getElementById('action').value = action;
    document.getElementById('codeSpan').innerText = code;
    document.getElementById('nameSpan').innerText = name;
    document.getElementById('priceSpan').innerText = price;
}