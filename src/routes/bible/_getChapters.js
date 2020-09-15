import bible from "./_getBible";

export default async function (book) {
    return bible[book].chapters.map(item => parseInt(item.chapter));
}