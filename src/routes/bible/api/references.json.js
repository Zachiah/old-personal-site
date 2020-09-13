import getChapters from "../_getChapters";
import getVerseNums from "../_getVerseNums"
import books from "/data/kjv/books.js";

export async function get(req,res,next) {
    let data = [];
    for (let book of books) {
        let chapters = (await getChapters(book));
        let newChapters = [];
        
        for (let chapter of chapters) {
            newChapters.push({chapter, highestVerse: Math.max(...await getVerseNums(book,chapter))});
        }

        data.push({'name': book, 'chapters': newChapters});
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
}