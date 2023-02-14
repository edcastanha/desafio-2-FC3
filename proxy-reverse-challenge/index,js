const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 3000

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
})

app.get('/', (req, res) => {
  const name = `User ${Math.floor(Math.random() * 1000)}`
  connection.query('INSERT INTO people (name) VALUES (?)', [name], (error, results) => {
    if (error) throw error
    console.log(`New name added: ${name}`)
  })

  connection.query('SELECT name FROM people', (error, results) => {
    if (error) throw error
    const names = results.map(result => result.name).join('<br>')
    res.send(`<h1>Full Cycle Rocks!</h1><p>Names:</p><p>${names}</p>`)
  })
})

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`)
})
