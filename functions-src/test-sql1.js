

const mysql = require('mysql');
const con = mysql.createConnection({ //apitests
    host: process.env.TEST_HOST,
    port: '3306',
    database: process.env.TEST_DB,
    password: process.env.TEST_PWD,
    user: process.env.TEST_DB
});

exports.handler = function(event, context, callback) {
	
	con.connect();

    con.query('SELECT tour_id, supplier, title FROM tours LIMIT 14', (err,rows) => {
        if(err) throw err;

        // console.log('\Initial status:\n');
        // console.log(rows);

        //rows.forEach( (row) => { //these are the field names
            //console.log(`${row.name} is in ${row.location}`);
        //});

        //console.log('Well before con.end: rows are '+JSON.stringify(rows));

        callback(null, {
            statusCode:200,
            body:JSON.stringify(rows)
        });
    });

    con.end();
    //issue: "errorMessage":"Cannot enqueue Handshake after invoking quit.","trace":["Error: Cannot enqueue Handshake after invoking quit.	

}