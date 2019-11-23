//import package
express = require('express')
//define variable
app = express()

//import metrics.js
metrics = require('./metrics.js')

//for jquery and bootstrap
path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

//for ejs
//second "/view" is the folder containing .ejs files
app.set('views', __dirname + "/view")
//set the view engine to ejs
app.set('view engine', 'ejs')

//set port
app.set('port', 1337)

//be sure to route before the listener
app.get(
	'/hello/:name',
	(req, res) => res.render('hello.ejs', {name: req.params.name})
)

//at`/` displaying a home page with somw instructions
app.get(
	'/',
	(req, res) => res.render('home.ejs')
)

//adding metrics
app.get('/metrics.json', (req, res) => {
	metrics.get((err, data) => {
		if(err) throw err
    	res.status(200).json(data)
  	})
})

//listen to the port
app.listen(
	app.get('port'), 
	() => console.log(`server listening on ${app.get('port')}`)
)
