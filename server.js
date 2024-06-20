const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

let books = [];

app.get('/books', function (req, res) {
    res.json(books);
});

app.post('/books', function (req, res) {
    const { title, author, pages, publish } = req.body;
    const newBook = { id: books.length + 1, title, author, pages, publish };
    books.push(newBook);
    res.status(201).json(newBook);
});

app.get('/books/:id', function (req, res) {
    const { id } = req.params;
    const book = books.find(book => book.id == id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

app.put('/books/:id', function (req, res) {
    const { id } = req.params;
    const { title, author, pages, publish } = req.body;
    const book = books.find(book => book.id == id);
    if (book) {
        book.title = title;
        book.author = author;
        book.pages = pages;
        book.publish = publish;
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

app.delete('/books/:id', function (req, res) {
    const { id } = req.params;
    books = books.filter(book => book.id != id);
    res.json({ message: 'Book deleted' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
