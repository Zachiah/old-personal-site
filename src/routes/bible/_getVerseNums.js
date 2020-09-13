export default async function (book, chapter) {
    return require(`../../../src/data/kjv/${book}.json`).chapters[chapter-1].verses.map(item => parseInt(item.verse));
}