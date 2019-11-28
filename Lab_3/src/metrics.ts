//necessary imports to work with leveldb
import { LevelDB } from './leveldb'
import WriteStream from 'level-ws'

//class metric containing timestamp and it's value
export class Metric {
	public timestamp: string
	public value: number

	constructor (ts: string, v: number){
		this.timestamp = ts;
		this.value = v;
	}
}

//class containing all the GET and POST methods,
//that we are going to use to manipulate the DB
export class MetricsHandler {
	
	//db, that we will use to read, write and delete values
	private db: any
	constructor(dbPath: string) {
    	this.db = LevelDB.open(dbPath)
  	}

	//'save' method - allows to insert metrics values into the database
	public save(key: number, metrics: Metric[], callback: (error: Error | null) => void) {
     	//opening a write stream
		const stream = WriteStream(this.db)

    	stream.on('error', callback)
     	stream.on('close', callback)
		//inserting metrics into the db
      	metrics.forEach((m: Metric) => {
        	stream.write({ key: `metric:${key}:${m.timestamp}`, value: m.value })
      	})
		//ending stream
      	stream.end()
    }

	//method to get all the metrics form the database
	public getAll(callback: (error: Error | null, result: any) => void) {
		//will regroup the metrics from the db, to output them later
		let metrics : Metric[] = []
		//start reading the db
		this.db.createReadStream()
			//when we encounter the data
			.on('data', function (data) {
				//displaying the data in console
				console.log(data.key, '=', data.value)
				console.log(data.key.split(':'))
				//saving the part of key that we need
				const timestamp = data.key.split(':')[2]
				//creating a metric
				let metric: Metric = new Metric(timestamp, data.value)
				//adding it into the array of metrics, that will be displayed
				metrics.push(metric)
		  	})
			//when we encounter an error
		  	.on('error', function (err) {
				console.log('Oh my!', err)
				callback(err, null)
		  	})
			//closing the stream
		  	.on('close', function () {
				console.log('Stream closed')
		  	})
			//ending the stream
		  	.on('end', function () {
				console.log('Stream ended')
				//we return metrics array to display it
				callback(null, metrics)
		  	})
	}
	//method to get one metric from the database
	public getOne(key: number, value: number,  callback: (error: Error | null, result: any) => void) {
		
		//will contain a metric to display
		let metric: Metric
		//start reading the db
		this.db.createReadStream()
			.on('data', function (data) {

				const timestamp = data.key.split(':')[2]
				
				if(key == data.key.split(':')[1] && value == data.key.split(':')[2]){
					console.log(data.key, '=', data.value) 
					console.log(data.key.split(':'))
					metric = new Metric(timestamp, data.value)
				}

			})
			.on('error', function (err) {
				console.log('Oh my!', err)
				callback(err, null)
			})
			.on('close', function () {
				console.log('Stream closed')
			})
			.on('end', function () {
				console.log('Stream ended')
				callback(null, metric)
			})
	}
	//method to delete a metric from the db
	public deleteMetric(key: number, value: number, callback: (error: Error | null, result: any) => void) {
  		
		//message to display
  		let message : string 
		message : 'No such metric exists in database, delition is impossible'
		
		//deliting a metric from the table
		this.db.del( `metric:${key}:${value}`,function(err){
			if(err)	{
				console.log('No such metric exists in database, delition is impossible')
				callback(err, message)
			}
		})
		//changing the message if delition was successfull
		message = `The metric is deleted`
		console.log(`The metric is deleted`)
		//returning the message to display
		callback(null, message)
	}

}
