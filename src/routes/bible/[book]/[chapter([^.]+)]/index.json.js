import validateBook from "../../_validateBook";

export async function get(req,res,next) {
    let {book,chapter} = req.params;
    chapter = parseInt(chapter) -1;

    if (await validateBook(book)) {
        let bookJSON = require(`../../../src/data/kjv/${book}.json`);
        if (chapter in bookJSON.chapters) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(bookJSON.chapters[chapter].verses.map(item => ({text: item.text, verse: parseInt(item.verse)}))));
        } else {
            console.log("Invalid chapter");
            next();
        }
        
    } else {
        console.log("Invalid Book")
        next();
    }
}
