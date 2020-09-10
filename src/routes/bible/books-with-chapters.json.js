import getChapters from "./_getChapters";
import books from "/data/kjv/books.js";

export async function get(req,res,next) {
    let data = [];
    for (let book of books) {
        data.push({'name': book, 'chapters': await getChapters(book)});
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
}