import validateBook from "../_validateBook";
import getChapters from "../_getChapters";

export async function get(req,res,next) {
    let {book} = req.params;

    if (await validateBook(book)) {
        let chapters = await getChapters(book);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(chapters));
        
    } else {
        next();
    }
}
