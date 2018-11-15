const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const session = require('express-session') // -> session storage using mongo
const path = require('path')

app.use(session({ secret: 'zz', resave: true, saveUninitialized: true }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '../frontend/dist/'))) // BUT ON PRODUCTION -> nginx

app.post('/api/auth', (req, res) => {
	
	const { username, password } = req.body
	
	
	if(username === 'admin' && password === 'admin') {
		req.session.auth = true
		req.session.user = username
		return res.json({ status: 'ok' })
	}
	
	return res.json({ status: 'error', data: `Username is ${username} and password is ${password} is wrong` })

})

app.post('/api/isloggedin', (req, res) => {
	return res.json({ status: req.session.auth || false })
})

app.post('/api/logout', (req, res) => {
	req.session.destroy(_ => {
		res.json({ status: 'ok' })
	})
})

app.post('/api/database', (req, res) => {
	return res.json({ status: 'ok', data: req.session.quote || "[not set yet]" })
})

app.post('/api/new', (req, res) => {
	req.session.quote = req.body.quote
	return res.json({ status: 'ok' })
})

app.get('*', (req, res) => {
	return res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})

app.listen(1234, _ => console.log('Up'))
