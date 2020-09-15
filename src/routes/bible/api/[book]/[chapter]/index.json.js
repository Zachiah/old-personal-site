import validateBook from "../../../_validateBook";
import bible from "/routes/bible/_getBible.js";

export async function get(req,res,next) {
    let {book,chapter} = req.params;
    chapter = parseInt(chapter) -1;

    if (await validateBook(book)) {
        let bookJSON = bible[book];
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
