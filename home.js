//global settings



//**********************************************************
//**********************************************************
//get last id in DataBase
function get_last_id()
{

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
      if (err)
      {
          console.log(err);
          console.log(err.code);
          console.log(err.fatal);
          //window.alert("cannot connect");
          // window.alert(err.code);
          alert("حدث خطأ فى الإتصال بقاعدة البيانات")
      }
  });

  // Perform a query
  // Perform a query
  $query = "SELECT MAX(id) FROM s30.soldiers;"
  var last_id = 1;
  last_id = connection.query($query, function(err, rows, fields)
   {
      if (err) {
          alert("حدث خطأ فى تنفيذ إدخال البيانات الى قاعدة البيانات تأكد من إدخال البيانات بشكل صحيح");
          console.log(err);
          return false;
      }

      localStorage.setItem("last_id",  parseInt(rows[0]["MAX(id)"], 10)+1);

    });


    // Close the connection
    connection.end(function() {// The connection has been closed});
  });
}
//**********************************************************
//log out function
function logout() {
    window.location.href = 'index.html';
}
//**********************************************************
// performing a Query on DataBase
function perform_query($query, action)
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
      if (err)
      {
          console.log(err);
          console.log(err.code);
          console.log(err.fatal);
          //window.alert("cannot connect");
          // window.alert(err.code);
          alert("حدث خطأ فى الإتصال بقاعدة البيانات")
      }
  });

  // Perform a query
  connection.query($query, function(err, rows, fields)
   {
      if (err) {
          alert("حدث خطأ فى تنفيذ إدخال البيانات الى قاعدة البيانات تأكد من إدخال البيانات بشكل صحيح");
          console.log(err);
          return false;
      }
      alert("تم ال"+action+ " بنجـاح " );

    });

    // Close the connection
    connection.end(function() {// The connection has been closed});
  });
}
//**********************************************************
// load data from my sql database
$(document).ready(function()
{
  get_last_id();
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
            { label: 'مسلسل', name: 'id', def: localStorage.getItem("last_id")},
            { label: 'رقم عسكرى', name: 'military_num' },
            { label: 'إسم', name: 'name' },
            { label: 'فرقة' , name: 'squad_name'},
            {
               label:      'تاريخ الإلتحـاق بالسرية',
               name:       'join_date',
               type:       'datetime',
               def:        function () { return new Date(); },
           },
            {type: 'select', label: 'التمام' , name: 'status',options: ["حاضر", "أجازة", "غياب", "تم الترحيل","أمن جوى","دفع" ]},
            { label: 'الوحدة الأساسية' , name: 'basic_unit'},
            { label: 'مأمورية على/تعديل' , name: 'assigned_unit'},
            { label: 'كتاب الشعبة' , name: 'assignment_id'},
            {type: 'select', label: 'فرقة/قوة/مأمورية' , name: 'squad_or_force_or_assigned', options: ["مأمورية", "قوة", "قوة إحتياطى","فرقة"]},
            { type: 'select', label: 'صعيد/بحرى' , name: 'upper_or_coast', options: ["صعيد","بحرى"]},

            { label: 'المهنة', name: 'career' },
            { label: 'التوصية', name: 'recommender' },
            { label: 'ملاحظات', name: 'notices' },


            { label: 'عنوان', name: 'adress' },
            { label: 'رقم تليفون', name: 'mobile_number', def: '01' },

            // etc
        ],

        "i18n": {

          "create": {
          "button": "إضافة",
          "title": "إضافة جندى جديد",
          "submit": "إضافة"
        },
        "edit": {
        "button": "تعديل",
        "title": "تعديل البيانات ",
        "submit": "تعديل"
      },
      "remove": {
      "button": "حذف",
      "title": "هل أنت متأكد من حذف التالى :",
      "submit": "حذف"
        }

      }

      } );


      //        "language":
      //initialize data table
      var table = $('#myTable').DataTable( {
          language: {
          search: "بــحـث :",

          "lengthMenu": "عرض _MENU_ جنود لكل صفحة",
          "zeroRecords": "لا يوجد جنود",
          "info": "عرض _PAGE_ من أصل _PAGES_",
          "infoEmpty": "لا يوجد جنود",
          "infoFiltered": "(filtered from _MAX_ total records)",
          "paginate": {
            "previous": "السـابق",
            "next": "التالى"
          },

          },

          data: rows,
          dom: 'Bfrtip',
          "autoSizing": true,
          "scrollX": true,
          columns:
          [
          { data: null },

          { data: 'id' },
          { data: 'military_num' },
          { data: 'name' },
          { data: 'squad_name' },
          { data: 'join_date' },
          { data: 'status' },
          { data: 'basic_unit' },
          { data: 'assigned_unit' },
          { data: 'squad_or_force_or_assigned' },
          { data: 'upper_or_coast' },
          { data: 'career' },
          { data: 'recommender' },
          { data: 'notices' },
          { data: 'adress' },
          { data: 'mobile_number' }
      ],
      select: true,
      buttons: [
            {
                extend: "create",
                editor: editor,
                submit: "إضافة",
                formButtons: [
                    'إضافة',
                    { text: 'إلغاء', action: function () { this.close(); } }
                ]
            },
            {
                extend: "edit",
                editor: editor,
                formButtons: [
                    'تعديل',
                    { text: 'إلغاء', action: function () { this.close(); } }
                ]
            },
            {
                extend: "remove",
                editor: editor,
                formButtons: [
                    'حذف',
                    { text: 'إلغاء', action: function () { this.close(); } }
                ],
                formMessage: function ( e, dt ) {
                    var rows = dt.rows( e.modifier() ).data().pluck('name');
                    return '<ul><li>'+rows.join('</li><li>')+'</li></ul>';
            }
          },
        ]


      } );
      //adding rows count
      table.on( 'order.dt search.dt', function () {
          table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
              cell.innerHTML = i+1;
          } );
      } ).draw();

      // insert new row to database table when new row created
      editor.on( 'create', function ( e, json, data )
      {
        get_last_id();
        //alert( 'New row added'  );
        console.log(data);

        $query = "INSERT INTO `soldiers` ( `military_num`, `name`, `adress`, `mobile_number`, `squad_name`, `join_date`, `upper_or_coast`, `basic_unit`, `assigned_unit`, `status`) VALUES ( '"+ data['military_num']+"' , '"+ data['name']+"' , '"+ data['adress']+"' , '"+ data['mobile_number']+"' , '"+ data['squad_name']+"' , '"+ data['join_date']+"' , '"+ data['upper_or_coast']+"' , '"+ data['basic_unit']+"' , '"+data['assigned_unit'] +"' , '"+ data['status']+"');"
        // alert(query);
        perform_query($query, "إضافة");


      } );


      editor.on( 'remove', function ( e, json, ids )
      {
        //alert( 'New row added'  );
        console.log(ids)
        for (var i in ids)
        {
          console.log(ids[i]);
          $query = "DELETE FROM `soldiers` WHERE `id`='"+ids[i]+"';";
          console.log($query);
          perform_query($query,"مسح");
        }

      } );


      editor.on( 'edit', function (e, json, data, id)
      {
        //alert( 'New row added'  );
        console.log(id);
        console.log(json);
        console.log(data);

        $query = "UPDATE `soldiers` SET `military_num`='"+data['military_num']+"', `name`='"+data['name']+"', `adress`='"+data['adress']+"', `mobile_number`='"+data['mobile_number']+"', `squad_name`='"+data['squad_name']+"', `join_date`='"+data['join_date']+"',`assignment_id`='"+data['assignment_id']+"', `career`='"+data['career']+"', `basic_unit`='"+data['basic_unit']+"', `assigned_unit`='"+data['assigned_unit']+"', `status`='"+data['status']+"',`recommender`='"+data['recommender']+"',`squad_or_force_or_assigned`='"+data['squad_or_force_or_assigned']+"',`notices`='"+data['notices']+"', `upper_or_coast`='"+data['upper_or_coast']+"' WHERE `id`='"+id+"';";
        perform_query($query, 'تعديل');


      } );

  });



  // Close the connection
  connection.end(function() {
      // The connection has been closed
  });
} );
//**********************************************************
