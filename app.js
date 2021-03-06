var http = require("http");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var app = express();
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
var entries = [];
app.locals.entries = entries;
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", function (request, response) {
    response.render("index");
});
app.get("/new-entry", function (request, response) {
    response.render("new-entry");
});
app.post("/new-entry", function (request, response) {
    if (!request.body.title || !request.body.content) {
        response.status(400).send("Entries must have a title and content.");
        return;
    }
    entries.push({
        title: request.body.title,
        content: request.body.content,
        published: new Date()
    });
    response.redirect("/");
});

// app.delete('/',function(req,res){
//     data = data.filter(function(todo){
//         return todo.item.replace(/ /g, '-') !== req.params.item;
//     })
// })

app.use(function (request, response) {
    response.status(404).render("404");
});
http.createServer(app).listen(3000, function () {
    console.log("Guestbook app started on port 3000.");
}); 