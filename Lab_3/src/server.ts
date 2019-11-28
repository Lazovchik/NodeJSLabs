//expressJS
import express = require('express')
//to use req.body later
import bodyparser = require('body-parser')
//importing metrics.js
import {MetricsHandler} from './metrics'

const app = express()
const port: string = process.env.PORT || '8080'

app.use(bodyparser.json());
app.use(bodyparser.urlencoded());

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

//declaring a metricsHandler to do the tests later with it
const dbMet: MetricsHandler = new MetricsHandler('./db/metrics')

//Inserting metrics into the database
app.post('/metrics/:id', (req: any, res: any) => {
	dbMet.save(req.params.id, req.body, (err: Error | null) => {
    	if (err) throw err
    	res.status(200).send('ok');
  	})
})

//Getting metrics from the DB
app.get('/metrics/', (req: any, res: any) => {
 	dbMet.getAll((err: Error | null, result: any) => {
    	if (err) throw err
		res.json(result)
  	})

})
//getting one metric from the DB
app.get('/metrics/:id/:number', (req: any, res: any) => {
 	dbMet.getOne(req.params.id, req.params.number, (err: Error | null, result: any) => {
    	if (err) throw err

		if(result!=0)
			res.json(result)
		else
			res.send('No such metric exists')
  })
})
//deleting a metric from the database
app.post('/metrics/:id/:number', (req: any, res: any) => {
  dbMet.deleteMetric(req.params.id, req.params.number, (err: Error | null, result: any) => {
    if (err) throw err
    res.status(200).send(result);
  })
})



///////////////
// adding metrics
// app.get('/metrics.json', (req: any, res: any) => {
// 	MetricsHandler.get((err: any, data: any) => {
// 		if(err) throw err
//     	res.status(200).json(data)
//   	})
// })
/////////////

//listen to the port
app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})
