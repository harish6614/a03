var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");

var app = express();  // make express app
var server = require('http').createServer(app); // inject app into the server

// 1 set up the view engine
app.set("views", path.resolve(__dirname, "views")) // path to views
app.set("view engine", "ejs") // specify our view engine

app.use(express.static(__dirname + '/assets'))

var pageActive=""

// 2 create an array to manage our entries
var entries = []
app.locals.entries = entries // now entries can be accessed in .ejs files

// 3 set up an http request logger to log every request automagically
app.use(logger("dev"))     // app.use() establishes middleware functions
app.use(bodyParser.urlencoded({ extended: false }))

// 4 handle http GET requests (default & /new-entry)
app.get(["/","index"], function (request, response) {
  response.render("index")
})
app.get("/index", function (request, response) {
  response.render("index")
})
app.get("/about", function (request, response) {
  response.render("about")
})
app.get("/contact", function (request, response) {
  response.render("contact")
})
app.get("/guestbook", function (request, response) {
  response.render("guestbook")
})
app.get("/new-entry", function (request, response) {
  response.render("new-entry")
})

// 5 handle an http POST request to the new-entry URI 
app.post("/new-entry", function (request, response) {
  if (!request.body.title || !request.body.body) {
    response.status(400).send("Entries must have a title and a body.")
    return
  }
  entries.push({  // store it
    title: request.body.title,
    content: request.body.body,
    published: new Date()
  })
  response.redirect("/guestbook")  // where to go next? Let's go to the home page :)
})

var nodemailer = require('nodemailer');
var xoauth = require('xoauth2');

var sendmailer = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    xoauth: xoauth.createXOAuth2Generator({
      user: 'harish6614@gmail.com',
      clientID: '1023753264395-a0r36hs5d0cbhmhlqg50mq4vu84s4f77.apps.googleusercontent.com',
      clientSecret: 'CRDFoYqqYWNzKD7mKxcYvZMt',
      refreshToken: '1/V296LHx_1Shb9HdyltXaOJbv0xItRto65YKFJ-2cCGo'
    })
  }
})


app.post("/contact", function (request, response) {

  var mailOptions = {
    from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
    to: 'harish.6614@gmail.com', // list of receivers
    subject: 'Message from:'+request.body.name, // Subject line
    text: 'Email: '+request.body.email+'\nMessage:'+request.body.message, // plain text body
    html: '<b>Hello world?</b>' // html body
  };

  sendmailer.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});
})

// if we get a 404 status, render our 404.ejs view
app.use(function (request, response) {
  response.status(404).render("404")
})

// Listen for an application request on port 8081
server.listen(8081, function () {
  console.log('Guestbook app listening on http://127.0.0.1:8081/');
});