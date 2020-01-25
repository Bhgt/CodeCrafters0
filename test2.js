var express = require('express');
var multer = require('multer');
var ejs = require('ejs');
var path = require('path');

const storage = multer.diskStorage({
	destination: './public/uploads/',
	filename: function(req, file, cb){
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

const upload = multer({
	storage: storage,
	limits: {fileSize: 1000000}
}).single('myImage');

const app = express();

const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static('./public'));
app.use(express.urlencoded());

app.get('/', (req, res) => res.render('index'));

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
			res.render('index', {
				msg: 'Uploaded successfully!',
				file: `uploads/${req.file.filename}`,
				title: req.body.myName
			});
		}
	});
});

app.listen(port, '0.0.0.0', () => console.log(`Server started on port ${port}`));