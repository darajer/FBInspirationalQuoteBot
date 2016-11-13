var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

app.set('port', (process.env.PORT || 5000))

//Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

//Process application/json
app.use(bodyParser.json())

//Index route 
app.get('/', function (req, res) {
	res.send('Hello world, I am a chatbot')
})

//For Facebook verification 
app.get('/webhook/', function (req, res) {
	if(req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

//Spin up the server
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})

app.post('/webhook/', function (req, res) {
	messaging_events=req.body.entry[0].messaging
	for (i=0; i<messaging_events.length; i++) {
	    event=req.body.entry[0].messaging[i]
	    sender=event.sender.id
	    if (event.message && event.message.text) {
		text=event.message.text
		if(text === 'Hi'){
			sendTextMessage(sender, "Text recieved, echo: " + text.substring(0,200))
		}
		else if(text==='Yes' || text==='yes'){
				sendTextQuote(sender, "Text recieved, echo: " + text.substring(0,200))
	   
	     }
	     res.sendStatus(200)
	})

	var token="EAAS0qe2E48IBAB08kKr9ZAEjZACGBBJK6XXAbiFchqmZBmBsZCKigKHSPHjU6a6ghLuZA2JiWHIB98n3bYV4xMcWeQHyGVb5fnfQQdf2ZABl7Ink4HZC2F7MXKK4LeFXWERM5Q6p8jNWtlGbGlEmAxjZCEUFUO1CqCy1qEutM99fLgZDZD"

function sendTextMessage(sender, text) {
	messageData={
		text:"Hi, I am here to provide you with some inspirational quotes. Are you ready?"
	}
	request({
	    url:'https://graph.facebook.com/v2.6/me/messages',
	     qs:{access_token:token},
	     method: 'POST',
	     json: {
		recipient: {id:sender},
		message:messageData,
		}
	      }, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if(response.body.error) {
			console.log('Error: ', repsonse.body.error)
		}
	    })

function sendTextQuote(sender, text) {
	messageData={
		text:"Cool, first one is: 'We either make ourselves miserable, or we make ourselves strong. The amount of work is the same.'
Carlos Castaneda"
	}
	request({
	    url:'https://graph.facebook.com/v2.6/me/messages',
	     qs:{access_token:token},
	     method: 'POST',
	     json: {
		recipient: {id:sender},
		message:messageData,
		}
	      }, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if(response.body.error) {
			console.log('Error: ', repsonse.body.error)
		}
	    })

	}

