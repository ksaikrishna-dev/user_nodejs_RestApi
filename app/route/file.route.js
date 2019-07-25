module.exports = (app, router, upload) => {
    const fileWorker = require('../controller/file.controller.js');
	
	//var path = __basedir + '/views/';
	var path = 'http://localhost:4200/files/';  // URL to web api
	
	router.use((req,res,next) => {
		console.log("/" + req.method);
		next();
	});
	
	app.get('/', (req,res) => {
		res.sendFile(path + "files.component.html");
	});
	
	app.post('/api/files/upload', upload.single("uploadfile"), fileWorker.uploadFile);
	
	app.get('/api/files/getall', fileWorker.listAllFiles);
	
	app.get('/api/files/:id', fileWorker.downloadFile);

	app.use('/',router);
 
	app.use('*', (req,res) => {
		res.sendFile(path + "404.html");
	});
}