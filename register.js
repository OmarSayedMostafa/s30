//master password
let master = '162019'
var found = false


function register(username, password, confirm_password, master_password) {
    if (master != master_password) {
        alert("كلمة السر الرئيسية غير صحيحة")
        return false;
    } else {
        if (username.length < 3) {
            alert("إسم المستخدم غير مقبول , يجب أن يكون مكون من أكثر من 3 أحرف");
            return false;
        }

        if (password != confirm_password) {
            alert("كلمة المرور و تأكيد كلمة المرور غير متطابقان");
            return false;
        }


        //connent to database
        var mysql = require('mysql');
        // Add the credentials to access your database
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '', // or the original password : 'apaswword'
            database: 's30',
            insecureAuth: true,

        });

        // connect to mysql
        connection.connect(function(err) {
            // in case of error
            if (err) {
                console.log(err.code);
                console.log(err.fatal);
                window.alert(err.code);
                alert("حدث خطأ فى الإتصال بقاعدة البيانات")
            }
        });

        // Perform inset query
        //user name is unique attribute so if tried to insert already exist user name mysql will refuse and throw error.

        $query = "INSERT INTO `users` (`name`, `password`) VALUES ('" + username + "', '" + password + "');"
        connection.query($query, function(err, rows, fields) {
            if (err) {
                console.log("An error ocurred performing inserting query.");
                window.alert("إسم المستخدم موجود بالفعل , إختر إسم أخر");
                //console.log(err);
                return false;
            }

            console.log("Query insert new user data succesfully executed", rows);
        });




        // Close the connection

        connection.end(function() {
            // The connection has been closed
        });






    }
}