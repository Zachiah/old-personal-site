import validateBook from "../../../_validateBook";
import books from "/data/kjv/books.js";

export async function get(req,res,next) {
    let {book,chapter} = req.params;
    chapter = parseInt(chapter)
    let chapterIndex = chapter -1;

    if (await validateBook(book)) {
        let bookJSON = require(`../../../src/data/kjv/${book}.json`);
        if (chapterIndex in bookJSON.chapters) {
            res.setHeader('Content-Type', 'application/json');

            let result;
            if (book === "revelation" && chapter === 22) {
                result = {
                    book: "genesis",
                    chapter: 1
                }
            }
            else if (chapterIndex+1 in bookJSON.chapters) {
                result = {
                    book,
                    chapter: chapter+1
                };
            }
            else {
                result = {
                    book: books[books.indexOf(book) + 1],
                    chapter: 1
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