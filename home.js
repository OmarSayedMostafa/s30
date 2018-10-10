function logout() {
    window.location.href = 'index.html';
}


// load data from my sql database
$(document).ready(function()
{
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
  $query = "SELECT * from soldiers;"

  connection.query($query, function(err, rows, fields)
   {
      if (err) {
          console.log("An error ocurred performing the query.");
          window.alert(err.code);
          console.log(err);
          return false;
      }
      //initialize editing
      var editor = new $.fn.dataTable.Editor( {
        data:  rows,
        table: '#myTable',
        idSrc:  'id',
        fields: [
            { label: 'مسلسل', name: 'id' },
            { label: 'رقم عسكرى', name: 'military_num' },
            { label: 'إسم', name: 'name' },
            { label: 'عنوان', name: 'adress' },
            { label: 'رقم تليفون', name: 'mobile_number' },
            // etc
        ]
      } );
      //initialize data table
      $('#myTable').DataTable( {
          data: rows,
          dom: 'Bfrtip',
          
          columns:
          [
          { data: 'id' },
          { data: 'military_num' },
          { data: 'name' },
          { data: 'adress' },
          { data: 'mobile_number' }
      ],
      select: true,
      buttons: [
        { extend: 'create', editor: editor },
        { extend: 'edit',   editor: editor },
        { extend: 'remove', editor: editor }
      ]
      } );
  });

  // Close the connection
  connection.end(function() {
      // The connection has been closed
  });
} );
