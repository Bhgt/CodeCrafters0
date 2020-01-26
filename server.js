var express = require('express');
var multer = require('multer');
var ejs = require('ejs');
var path = require('path');

const storage = multer.diskStorage({
	destination: './public/uploads/',
	filename: function(req, file, cb){
		cb(null, req.body.myName + path.extname(file.originalname));
	}
});

const upload = multer({
	storage: storage,
	limits: {fileSize: 1000000}
}).single('myImage');

const app = express();

const port = 3000;

var posts = [];

app.set('view engine', 'ejs');

app.use(express.static('./'));
//app.use(express.urlencoded());

app.get('/', (req, res) => res.sendFile(__dirname+'/index.html'));

app.get('/post', (req, res) => res.render('index', {posts: posts}));

app.post('/upload', (req, res) => {
	upload(req, res, (err) => {
		if(err){
			res.render('index', {
				msg: err
			});
		}else if(req.file == undefined){
			res.render('index', {
				msg: 'ERROR: No file given!'
			});
		}
		else{
			posts.push(req.body.myName);
			res.render('index', {
				msg: 'Uploaded successfully!',
				file: `uploads/${req.file.filename}`,
				title: req.body.myName,
				posts: posts
			});
		}
	});
});

app.listen(port, '0.0.0.0', () => console.log(`Server started on port ${port}`));