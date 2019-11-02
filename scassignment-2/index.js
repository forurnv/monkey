// Create in memory this name "express" space and give it the value of express module (being pulled/required).
const express = require("express");

// Create in memory this name "pageInfo" space and give it the value of pageInfo (being pulled/required).
const pageInfo = require("./pageInfo");

// Create in memory this name "pageInfo" space and give it the value of middleware (being pulled/required).
const middleware = require("./middleware");

// Create in memory this name "path" space and give it the value of path (being pulled/required).
const path = require("path");

// Create in memory this "app" space and give it the value of initialize or envoke the "express".
const app = express();

// !!!!!!!SURPRISE!!!!!!
const favicon = require('express-favicon');
app.use(favicon(__dirname + 'assets/bombfavicon.ico/favicon.ico'));

// Enables path without extentions
app.set('view engine', 'ejs');

// Use this method of "app" and ask it to allow the extended syntax to be choosen when parsing the url encoded data with the querystring library when false or rather than the qs library when true
app.use(express.urlencoded({extended: false}));

// // Create a route to access a hardcoded Array. Remember that this is used for API's as well as external sources.
// app.get("/api/members", (req,res) => {
// 	res.json(members);
// });

// THE MAGIC CODE part 1 THAT ALLOWS THE ARRAY OBJECTS TO BE TARGETTED FROM THE ROOT DIR THROUGH THE INDEX
app.get('/', function(request, response){
	response.render('index', pageInfo.index);
});

// THE MAGIC CODE part 2 THAT ALLOWS THE ARRAY OBJECTS TO BE TARGETTED THROUGH THE LINKS OF EACH PARTIAL (IN THIS CASE) PUT ON EACH PAGE
app.get('/:page', function(request, response){
	response.render(request.params.page,pageInfo[request.params.page]);
});

// Envocation of middleware for my created module
app.use(middleware)

// Use this post method of app to redirect users to /submit upon form submission.
app.post('/submit', function(request, response) {
	response.render('submit', {name: request.body.name, email: request.body.email})
});

// // Create a route for requests/responses in the form of an arrow/get function, followed by an action to render a confirmation.(for startup purposes)
// app.get('/', (req,res) => {
// 	res.send("HELLO");
// });
// // // Create a route for requests/responses to our new html page. Or any page really! 
// 		res.sendFile(path.join(__dirname, "public", "index.html"));
// });
// // But you should do this to avoid the repetitive task of doing this for every page. Especially seeing as how we want this public folder to be a static folder.
app.use(express.static(path.join(__dirname, "assets")));

// Create in memory this "PORT" space and give it the optional (address/environment) values of one port or another, (In this case defaulting to 3000) with the use of a boolean. Sometimes done in another file.
const PORT = process.env.PORT || 3000;

// Create in memory a program that listens for activity and give it the value of an address to listen at/to, in this case our predetermined port boolean, followed by an action to render a confirmation.
app.listen(PORT, () => console.log(`server started on port ${PORT}`));