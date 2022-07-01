
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app =  express();
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static("public"));


app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})


app.post("/",function(req,res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email_id = req.body.email;

    console.log(firstName,lastName,email_id);

    const listID = "a6d88f980a";
    const apiKey = "40093644faed0646f3890fe24f664d7f-us14";

    const url = "https://us14.api.mailchimp.com/3.0/lists/"+listID+"/";

    const options={
        method: 'POST',
        auth: "janu:40093644faed0646f3890fe24f664d7f-us14"

    }

    const data={
        members : [
            {
                email_address:email_id,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }

            }    

        ]
       
    }

    const jsonData = JSON.stringify(data);


    var request = https.request(url,options,function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname +"/success.html");
        }else{
            res.sendFile(__dirname +"/failure.html"); 
        }
        console.log("statusCode");

        response.on("data",function(data){
            console.log(JSON.parse(data));

            

        })
    })

    request.write(jsonData);
    request.end();



})


// audience ID
// a6d88f980a

// API Key
// 40093644faed0646f3890fe24f664d7f-us14






app.listen(process.env.PORT,function(){
    console.log("Server started at port 3000");
})
