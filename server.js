// import express
const express = require('express');
const fs = require('fs');

// create app instance
const app = express();

//TODO: define our template engine
app.engine('madeline', (filePath, options, callback) => {
    // reading template file
    fs.readFile(filePath, (err, content) => {
        // function to catch and log the error to engine's callback
        if(err) return callback(err);
        // if no error parse the template file
        const render = content.toString().replace('#title#', '<title>' + options.title + '</title>')
        .replace('#message#', '<h1>' + options.message + '</h1>')
        .replace('#content#', '<div>' + options.content + '</div>');
        // returns parsed data. Render variable will change template.madeline
        return callback(null, render);
    });
});

// ? Config ============
//  setting the views folder into our app
app.set('views', './views');
// tells our app to view the engine that is named 'madeline'
app.set('view engine', 'madeline');



//TODO: tell our express app to use the template engine



//TODO: create routes
app.get('/', (req, res) => {
    // res.send("<h1>Hello World!</h1>");
    res.render('template', {title: 'Ousman', message: 'My first template engine!', content: 'I created my own template engine while learning the basics of Node.js!'})
});

app.get('/about', (req, res) => {
    res.render('template', {title:'About Me!', message: 'Learning Node!', content: "I'm currently learning the basics of Node.js and I'm having a fun time watching everything come full circle."})
});

app.get('/today', (req, res) => {
    res.render('template', {title: 'Today', message: 'Today is 4/6/2023', content: "MY BIRTHDAY IS IN A FEW WEEKS AND I CAN'T EVEN EAT ON MY BIRTHDAY! Still want some ice cream cake though."})
})




const PORT = 3000;
app.listen(PORT, () =>{
    console.log(`Server is running on ${PORT}...`);
});