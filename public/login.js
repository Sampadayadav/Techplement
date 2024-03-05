const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/assets",express.static("assets"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sampadasy@2001",
    database: "nodejs"
});

// connect to the database
connection.connect(function(error){
    if (error) throw error
    else console.log("connected to the database successfully!")
});

app.get("/allusers",function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/user",encoder, function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    if(username && password)
    {
        query = `
        SELECT * FROM loginuser 
        WHERE user_name = "${username}"
        `;

        database.query(query, function(error, data){

            if(data.length > 0)
            {
                for(var count = 0; count < data.length; count++)
                {
                    if(data[count].user_pass == password)
                    {
                        request.session.user_id = data[count].user_id;

                        response.redirect("/");
                    }
                    else
                    {
                        response.send('Incorrect Password');
                    }
                }
            }
            else
            {
                response.send('Incorrect Email Address');
            }
            response.end();
        });
    }
    else
    {
        response.send('Please Enter Email Address and Password Details');
        response.end();
    }

});

/*connection.query("select * from loginuser where user_name = ? and user_pass = ?",[username,password],function(error,results,fields){
    if (results.length > 0) {
        res.redirect("/welcome");
    } else {
        res.redirect("/");
    }
    res.end();
})
})/*

// when login is success
app.get("/welcome",function(req,res){
res.sendFile(__dirname + "/welcome.html")
})*/



// set app port 
app.listen(4500);
