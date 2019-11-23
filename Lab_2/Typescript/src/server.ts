import express = require('express')

const app = express()
const port: string = process.env.PORT || '8080'

/*modified*/

//import metrics.js
const metrics = require('./metrics.js')

//for jquery and bootstrap
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

//for EJS
//second "/view" is the folder containing .ejs files
app.set('views', __dirname + "/view")
//set the view engine to ejs
app.set('view engine', 'ejs')


//at`/` displaying a home page with somw instructions
app.get('/',(req: any, res: any) => {
	res.render('home.ejs')
	res.end()
})

//displaying a main interractive page
app.get('/hello/:name', (req: any, res: any) => {
	res.render('hello.ejs', {name: req.params.name})
	res.end()
})

//adding metrics
app.get('/metrics.json', (req: any, res: any) => {
	metrics.get((err: any, data: any) => {
		if(err) throw err
    	res.status(200).json(data)
  	})
})

//listen to the port
app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})
