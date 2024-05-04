const path=require("path");
const express=require('express');
const cookieParser=require('cookie-parser');
const mongoose=require("mongoose");
const Blog=require('./models/blog')
const userRoute=require('./routes/user');
const blogRoute=require('./routes/blog');


const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const app=express();
PORT=8000;

mongoose.connect("mongodb://localhost:27017/blogify").then(()=>console.log("mongodb Connected!!"));
app.set("view engine",'ejs');
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve('./images')))



app.get('/',async(req,res)=>{
    const allBlogs=await Blog.find({});
    return res.render("home",{
        user:req.user,
        blogs:allBlogs,
    });
})


app.use('/user',userRoute);

app.use('/blog',blogRoute);



app.listen(PORT,()=>console.log('listening at port 8000'));