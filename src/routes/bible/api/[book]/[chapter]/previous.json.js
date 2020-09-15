import validateBook from "../../../_validateBook";
import books from "/data/kjv/books.js";
import getChapters from "../../../_getChapters";
import bible from "/routes/bible/_getBible.js";

export async function get(req,res,next) {
    let {book,chapter} = req.params;
    chapter = parseInt(chapter)
    let chapterIndex = chapter -1;

    if (await validateBook(book)) {
        let bookJSON = bible[book];
        if (chapterIndex in bookJSON.chapters) {
            res.setHeader('Content-Type', 'application/json');

            let result;
            if (book === "genesis" && chapter === 1) {
                result = {
                    book: "revelation",
                    chapter: 22
                }
            }
            else if (chapterIndex-1 in bookJSON.chapters) {
                result = {
                    book,
                    chapter: chapter-1
                };
            }
            else {
                let newBook = books[books.indexOf(book) -1];
                let newBookChapters = await getChapters(newBook);
                result = {
                    book: newBook,
                    chapter: newBookChapters[newBookChapters.length-1]
                }
            }

            res.end(JSON.stringify(result));
            
        } else {
            next();
        }
        
    } else {
        next();
    }
}