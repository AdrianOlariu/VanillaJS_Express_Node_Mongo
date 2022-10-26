
const books = require('../model/Books.json');

function getTitles(req,res){
    const titles = books.map(book => book.title);
    res.json(titles);
}

function getAuthors(req,res){
    const authors = books.map(book => book.author);
    res.json(authors);
}

function getAllBooks(req,res){
    res.json(books);
}

const getBook = function (req,res){
    console.log(req.body);
    res.json(books.filter((book)=>{
        return book.isbn === req.params.isbn;
    }));
}

const postBook = function(req,res){
    console.log(req.body);
    res.json(books);
}

module.exports = {getTitles, getAuthors, getAllBooks, postBook, getBook};