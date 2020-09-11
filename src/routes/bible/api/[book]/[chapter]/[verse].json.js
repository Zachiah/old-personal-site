import validateBook from "../../../_validateBook";

export async function get(req,res,next) {
    let {book,chapter,verse} = req.params;
    chapter = parseInt(chapter) -1;
    verse = parseInt(verse) - 1;

    if (await validateBook(book)) {
        let bookJSON = require(`../../../src/data/kjv/${book}.json`);
        if ((chapter in bookJSON.chapters) && (verse in bookJSON.chapters[chapter].verses)) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(bookJSON.chapters[chapter].verses[verse]));
        } else {
            next();
        }
        
    } else {
        next();
    }
}