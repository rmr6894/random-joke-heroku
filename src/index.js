//console.log("First web service starting up ...");

// 1 - pull in the HTTP server module
const http = require('http');

// 2 - pull in URL
const url = require('url');

// 3 - locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// 4 - here's our 404 page
const errorPage = `
<html>
    <head>
        <title>404 - File Not Found!</title>
    </head>
    <body>
        <h1>404 - File Not Found!</h1>
        <p>Check your URL, or your typing!!</p>
        <p>Perhaps you are looking for <a href="/random-joke">/random-joke</a> ?</p>
    </body>
</html>`;

// 5 - this will return a random joke, as a string
const getRandomJokeJSON = () => {
    const jokes = [
        ["What do you call a very small valentine?", "A valen-tiny!"],
        ["What did the dog say when he rubbed his tail on the sandpaper?", "Ruff, Ruff!"],
	["Why don't sharks like to eat clowns?", "Because they taste funny!"],
	["What did the boy cat say to the girl cat?", "You're Purr-fect!"],
	["What is a frog's favorite outdoor sport?", "Fly Fishing!"],
	["I hate jokes about German sausages.", "Theyre the wurst!"],
	["Did you hear about the cheese factory that exploded in France?", "There was nothing left but de Brie!"],
	["Our wedding was so beautiful ", "Even the cake was in tiers!"],
	["Is this pool safe for diving?", "It deep ends!"],
	["Dad, can you put my shoes on?", "I dont think theyll fit me!"],
	["Can February March?", "No, but April May!"],
	["What lies at the bottom of the ocean and twitches?", "A nervous wreck!"],
	["Im reading a book on the history of glue.", "I just cant seem to put it down!"],
	["Dad, can you put the cat out?", "I didnt know it was on fire!"],
	["What did the ocean say to the sailboat?", "Nothing, it just waved!"],
	["What do you get when you cross a snowman with a vampire?", "Frostbite!"]
    ];

    const number = Math.floor(Math.random() * 16);
    const responseObj = {
        q: jokes[number][0],
        a: jokes[number][1]
    };
    return JSON.stringify(responseObj);
};

// 6 - this is the function that will be called every time a client request comes in
// this time we will look at the `pathname`, and send back the appropriate page
// note that in this course we'll be using arrow functions 100% of the time in our server-side code
const onRequest = (request, response) => {
    //console.log(request.headers);
    const parsedUrl = url.parse(request.url);
    const pathname = parsedUrl.pathname;
    //console.log("parsedUrl=", parsedUrl);
    //console.log("pathname=", pathname);

    if(pathname == "/random-joke") {
        response.writeHead(200, { 'Content-Type': 'application/json' }); // send response headers
        response.write(getRandomJokeJSON()); // send content
        response.end(); // close connection
    }
    else {
        response.writeHead(404, { 'Content-Type': 'text/html' }); // send response headers
        response.write(errorPage); // send content
        response.end(); // close connection
    }
};


// 7 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port); // method chaining!

//console.log(`Listening on 127.0.0.1: ${port}`);
