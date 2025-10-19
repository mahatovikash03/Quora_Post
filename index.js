const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({extended: true})); //express can understant client and frontend post and when data is post to server 
app.use(methodOverride('_method'))

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views")); //js can use this folder thats why this line written

app.use(express.static(path.join(__dirname,"public"))); //js can use this folder thats why this line written

let posts = [
    {
        id : uuidv4(),
        username : "@apnacollege",
        content : "Learn coding from ApnaCollege"
    },
    {
        id : uuidv4(),
        username : "@CodeHelp",
        content : "Learn Web from CodeHelp"
    },
    {
        id : uuidv4(),
        username : "@PhysicsWallah",
        content : "Learn Dsa from PhysicsWallah"
    },
    {
        id : uuidv4(),
        username : "@CaWallah",
        content : "Learn Dsa from PhysicsWallah"
    }
]

//first api
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

//second api create new post
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
});

//third api create post added in array
app.post("/posts",(req,res)=>{
    console.log(req.body);
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    // res.send("post request working"); change this to redirect both page
    res.redirect("/posts");
})

//fourth api show id wise post
app.get("/posts/:id",(req,res) => {
    let { id }  = req.params;
    let post = posts.find((p)=> id===p.id );
    res.render("show.ejs",{post});
})

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p)=> id===p.id);
    post.content = newcontent;
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
})

app.listen(port,()=>{
    console.log("listening to port : 8080");
});