// Write a blog app!

// Your blog must contain posts. Posts must contain a title, a body, and the ability to have an image, but feel free to add more as you see fit.
// Your blog must support all basic CRUD operations for posts (including forms for adding, editing, and removing posts). This might be a good time to experiment with the textarea type of input!
// Your app must be written as an Express server and be backed by a Sqlite3 database.
// You must make a new repo for this app.
// You must add, commit, and push whenever you add a feature (although you should be doing it more frequently than that!).
// You must write out a spec for your app and put it in your repo.
// Your spec should include an ERD diagram.

// After completing this, you can try the following:

// Host this app on Digital Ocean.
// Add comments to posts. Think about the relationship between comments and posts. Comments also must need to support all basic CRUD operations with appropriate forms.
// Hit the Instagram (or Giphy) API for adding images (or gifs) to your posts.
// Be sure to update both your ERD and your spec if you implement comments or an API!


//REQUIREMENTS
var express = require('express')
var app = express();

//templating stuff
var ejs = require("ejs")
app.set("view engine", "ejs")
//body parser
var bodyParser = require('body-parser')
//tell app which method to use when parsing
app.use(bodyParser.urlencoded({extended: false}))

//method override setup
var methodOverride = require('method-Override')
//tell app which override method to use
app.use(methodOverride('_method'))

//allow sqlite3
var sqlite3 = require('sqlite3').verbose();
//set database
var db = new sqlite3.Database('blog.db');
//request
var request = require('request')


//ROUTES
//redirect
app.get('/', function(req, res){
	res.redirect('/posts')
});
//show all posts
app.get('/posts', function(req, res){
	db.all('SELECT * FROM posts', function(err, data){
		if (err) {
			console.log(err);
		} else {
			var posts = data;
			console.log(posts)
		} res.render('index.ejs', {posts: posts});
	});
});
//show individual post
app.get('/post/:id', function(req, res){
	var id = req.params.id;
	db.get('SELECT * FROM posts WHERE id = ?', id, function(err, data){
		var post_row = data;
		console.log(post_row);
		res.render('show.ejs', {thisPost: data})
	});
});
//serve up new page to create a new post
app.get('/posts/new', function(req, res){
	res.render('new.ejs')
})
//create a new post
app.post('/posts', function(req, res){
	console.log(req.body)



})
//sending user to eduit/update a post page
app.get('post/:id/edit', function(req, res){
	var thisPost = posts[parseInt(req.params.id)]
	res.render("edit.ejs", {thisPost: thisPost})
})
//update a post
app.put('post/:id', function(req, res){
	pets[parseInt(req.params.id)] = {
		id: parseInt(req.params.id),
		title: req.body.title,
		type: req.body.type
	}
	
	//redirect to this posts's page to see changes
	res.redirect('/post/' + parseInt(req.params.id))

});

//delete a post
app.delete('/post/:id', function(res, res){
	delete pets[parseInt(req.params.id)]
	res.redirect('/posts')
});


app.listen('3000');
console.log("listening on port 3000");