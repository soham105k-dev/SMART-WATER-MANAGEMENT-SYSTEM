import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
});    
import ConnectDB from "./config/db.js";
import app from "./app.js";

ConnectDB()
.then(()=>{
    app.listen(process.env.PORT || 6000 , ()=>{
        console.log(`Server is running on port ${process.env.PORT || 6000}`);
    })
})
.catch( (err)=> {
    console.log("mongo DB connection error",err);
}) 