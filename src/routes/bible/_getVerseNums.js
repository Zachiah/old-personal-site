import bible from "./_getBible.js";

export default async function (book, chapter) {
    return bible[book].chapters[chapter-1].verses.map(item => parseInt(item.verse));
}