// Import express.js
const express = require('express');
// Import path package
const path = require('path');
// import fs package
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
 
app.use(express.static('public'));

app.get('/notes', (req, res) => {
  console.log(req)
  console.log(res)
  res.sendFile(path.join(__dirname, '../../notes.html'))
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../index.html'))
  console.log(req)
  console.log(res)
});

app.get('/api/notes', (req, res) => {
  res.json(notes)
  console.log(req)
  console.log(res)
});

app.post('/api/notes',(req, res) => {
  console.log(req)
  console.log(res)
  let newNote = req.body;
  console.log(newNote)
  //newNote.id = uuidv4();
  notes.push(newNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  res.json(newNote);
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));