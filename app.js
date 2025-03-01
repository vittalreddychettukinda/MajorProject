const express=require("express");
const mongoose=require("mongoose");
const path=require("path");
const app=express();
const methodoverride=require("method-override");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodoverride("_method"))
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
// index route
app.get("/listings",async(req,res)=>{
     let alllistings=await Listing.find({});
     res.render("listings/index.ejs",{alllistings});
   
})
// new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})
// show route
app.get("/listings/:id",async(req,res)=>{
     let {id}=req.params;
     let listing  = await Listing.findById(id);
     res.render("listings/show.ejs",{listing});
      
})
// handling post request 
app.post("/listings",async(req,res)=>{
  let newlistings=await new Listing(req.body.listing);
  newlistings.save();
  res.redirect("/listings");
})
// before update the route first get the route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
     let listing  = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});
// update the route 
app.put("/listings/:id",async(req,res)=>{
        const {id}=req.params;
        await Listing.findByIdAndUpdate(id,{...req.body.listing});
        res.redirect("/listings");

});
//  delete the route
app.delete("/listings/:id",async(req,res)=>{
    const {id}=req.params;
    let deleteroute=await Listing.findByIdAndDelete(id);
      res.redirect("/listings");
})
