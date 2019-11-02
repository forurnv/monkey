// Create in memory this name "express" space and give it the value of express module (being pulled/required).
const express = require("express");

// Create in memory this "filesystem" space and give it the  value of pageInfo (being pulled/required).
const fs = require("fs");

// MIDDLEWARE----------
// USE THIS FUNCTION TO REQUEST A POST TO BE MADE AND APPEND IT INTO A FILE
const middleware = function (request, response, next) {
	if (request.method === 'POST') {
		fs.appendFile('HERES YOUR LOG FILE.txt', "NAME: " + request.body.name + " , EMAIL: " + request.body.email + "\n\n", function() {
			console.log("SUBMITTED INFO")
		})
	}
	next()
};
module.exports = middleware;