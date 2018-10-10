//check login credential
function login(username, password) {

    //check if empty name provided or a user name less than 3 chars
    if (username.length == 0 || username === '' || username.length < 2) {
        alert("تـأكد من إدخال إسم المستخدم و كلمة المرور بطـريقة صحيحة")
        return false;
    }
    // check if the user name existed in database.
    else {
        //connent to database
        var mysql = require('mysql');
        // Add the credentials to access your database
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '162019', // or the original password : 'apaswword'
            database: 's30',
            insecureAuth: true,

        });

        // connect to mysql
        connection.connect(function(err) {
            // in case of error
            if (err) {
                console.log(err.code);
                console.log(err.fatal);
                //window.alert("cannot connect");
                window.alert(err.code);
                alert("حدث خطأ فى الإتصال بقاعدة البيانات")

            }
        });

        // Perform a query
        $query = "SELECT name, password from users where name =" + "'" + username + "'"

        connection.query($query, function(err, rows, fields) {
            if (err) {
                console.log("An error ocurred performing the query.");
                window.alert(err.code);
                console.log(err);
                return false;
            }

            //TODO:: need to restrict register by unique user names.
            if (rows.length == 1 && password == rows[0].password) {
                //access permitted
                // TODO:: create home page
                localStorage.setItem("username", username)
                window.location.href = 'home.html';

            } else {
                alert("access denaied")
            }


            console.log("Query succesfully executed", rows);
        });

        // Close the connection
        connection.end(function() {
            // The connection has been closed
        });
    }

}
