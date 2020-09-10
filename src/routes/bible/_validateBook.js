import books from "/data/kjv/books.js";

export default async function (book) {
    return (books.indexOf(book) !== -1);
}