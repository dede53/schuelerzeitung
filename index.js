var express					=	require('express.oi');
var multer                  =   require('multer')
var upload                  =   multer({ "dest": './uploads/'});
var app						=	express().http().io();
var fs                      =   require('fs');

app.use(express.static(__dirname + '/public'));		// provides static htmls

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});
app.get('/success', function(req, res){
	res.sendFile(__dirname + '/public/success.html');
});
app.get('/error', function(req, res){
	res.sendFile(__dirname + '/public/error.html');	
});

app.post('/savePic', upload.array('foo', 20), function(req, res, text){
    var error = false;
    req.files.forEach(function(file){
        var tmp_path = file.path;
        var filename = file.originalname.split(".");

        var target_path = 'uploads/' + req.body.username +"-"+ file.filename + "." + filename[1];

        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(target_path);
        src.pipe(dest);
    });
    res.sendFile(__dirname + '/public/success.html'); 
});

try{
	app.listen(8000, function(){
		console.log({"statusMessage": "Läut auf Port:8000"});
	});
}catch(e){
    console.log(e);
}