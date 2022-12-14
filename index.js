import express from "express"; 
const app = express();
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config();


const PORT = process.env.PORT;



function getFileDate() {
  
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hrs = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    var timestamp = hrs+"hrs"+minutes+"mins"+seconds+"secs";
    let fileName =
      date + "-" + month + "-" + year + " " + hrs + "_" + minutes + "_" + seconds;
  
    return { fileName, timestamp };
  }


  app.get("/", function (request, response) {
    response.send("Endpoints:<br><br>"+"To create file : /createfile <br><br>" +"To read all files : /getfiles");
  });


  app.get("/createfile", (req,res)=>{
    const {fileName, timestamp} = getFileDate();
    fs.writeFile(`./Backup/${fileName}.txt`, timestamp, (err)=>{
        if(err) console.log(err);
        else console.log("file created" + fileName)
    });
    res.send(`file createdwith name ${fileName}.txt with content ${timestamp}`)
})


app.get("/getfiles", (req,res)=>{
    fs.readdir("./Backup/",(err, files)=>{

        if(files.length == 0) {
            res.send("No files in directory")
        }else{
            let filesList = "Files in directory are <br>";
            files.forEach((file)=>{
                filesList += file + "<br>"
            })
            res.send(filesList)
        }

    })
})

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));