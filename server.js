const express = require("express");
const mongoose = require("mongoose");

const app = express();

const bodyParser = require("body-parser");
const { redirect } = require("statuses");

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Connection to MongoDB
mongoose.connect("mongodb+srv://Admin:123@post.xoqbr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Creating the Model
const noteSchema = {
    title: String,
    content: String
}

const Note = mongoose.model("Note", noteSchema);

// Connecting server to view

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

// Posting to MongoDB

app.post("/", function(req, res){
    let newNote = new Note({
        title: req.body.title,
        content: req.body.content
    })

    newNote.save();
    res.redirect("/");
})

app.listen(4000, function(){
    console.log("Server is running in 4000");
})