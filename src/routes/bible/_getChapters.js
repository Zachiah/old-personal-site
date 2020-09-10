export default async function (book) {
    return require(`../../../src/data/kjv/${book}.json`).chapters.map(item => parseInt(item.chapter));
}