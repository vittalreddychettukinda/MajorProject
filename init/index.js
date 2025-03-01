const mongoose=require("mongoose");
const initData=require("./data.js")
const Listing=require("../models/listing.js");
const express=require("express");
const app=express();
const port=8080;
const Listing=require("./models/listing");
app.listen(port,()=>{
    console.log("port is woking",{port});
});
main().then(()=>{
    console.log("db is connected");

}).catch((err)=>{
    console.log("err");
});
async function main(){
         await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
   };
app.get("/listings",async(req,res)=>{
     await Listing.find({}).then((res)=>console.log(res));
     res.send("sucess");
   
})
const initDb=async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("inserted succcessfully");
}
initDb();