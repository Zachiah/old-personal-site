import bible from "../_getBible.js";

export async function get(req,res,next) {
    const query = req.query;

    // helper function to handle getting the right case of text based on the users options
    const caseBasedText = (text) => query.caseSensitive ? text : text.toLowerCase();

    // /* <FOUND IT FUNCTION> checks if the search is in the text */
    // const foundIt = (text) => query.exactMatch ?
    //     // They want an exact match, this doesn't include case as case is a separate option
    //     (caseBasedText(text).indexOf(caseBasedText(query.search)) !== -1) :
    //     // The don't care about exact matches
    //     (query
    //         .search
    //         .split(" ")
    //         .reduce(
    //             (prev, word) => prev && (caseBasedText(text).indexOf(caseBasedText(word)) !== -1),
    //             true
    //         ));
    // /* </FOUND IT FUNCTION> */

    const foundIt = (text) => {
        if (query.exactMatch) {
            if (query.wholeWords) {
                return ` ${caseBasedText(text)} `.indexOf(` ${caseBasedText(query.search)} `) !== -1;
            }
            else {
                return caseBasedText(text).indexOf(caseBasedText(query.search)) !== -1;
            }
        }
        else {
            let words = query.search;
            words = words.split(" ")
            
            let result;
            if (query.wholeWords) {
                result = words.reduce(
                    (prev,word) => prev && (caseBasedText(text).split(" ").indexOf(caseBasedText(word)) !== -1),
                    true
                );
            }
            else {
                result = words.reduce(
                    (prev, word) => prev && (caseBasedText(text).indexOf(caseBasedText(word)) !== -1),
                    true
                );
            }

            return result;

        }
    }

    function anotatedTextReplacer(text, string) {
        if (query.caseSensitive) {
            if (query.wholeWords) {
                return ` ${text} `.replace(new RegExp(` (${escapeRegExp(string)}) `, "g"), ` <b>$1</b> `).trim();
            }
            else {
                return text.replace(new RegExp(`(${escapeRegExp(string)})`, "g"), `<b>$1</b>`);
            }
        }
        else {
            if (query.wholeWords) {
                return ` ${text} `.replace(new RegExp(` (${escapeRegExp(string)}) `, "ig"), ` <b>$1</b> `).trim();
            }
            else {
                return text.replace(new RegExp(`(${escapeRegExp(string)})`, "ig"), `<b>$1</b>`);
            }
            
        }
    }

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }

    if (query.search) {
        let ok = true;
        let results = [];

        for (let book in bible) {
            for (let chapter of bible[book].chapters) {
                for (let verse of chapter.verses) {
                    if (foundIt(verse.text)) {
                        let anotatedText = verse.text;
                        if (query.exactMatch) {
                            anotatedText = anotatedTextReplacer(anotatedText, query.search);
                        } else {
                            for (let word of query.search.split(" ").sort((a,b) => b.length - a.length)) {
                                anotatedText = anotatedTextReplacer(anotatedText, word);
                            }
                        }

                        results.push({...verse, chapter: chapter.chapter, book,anotatedText})
                    }
                }
            }
        }

        // Pagination
        let lastPage = false;
        let highestPage = 1;
        if (query.page) {
            const amountPerPage = 80;
            highestPage = Math.ceil(results.length / amountPerPage);
            let page = parseInt(query.page);
            if (!isNaN(page) && ((page <= highestPage) || (results.length === 0)) && (page > 0)) {
                results = results.slice((page - 1) * amountPerPage, page * amountPerPage);
                if (page === highestPage || highestPage === 0) {
                    lastPage = true;
                }
            } else {
                ok = false;
            }
        } else {
            lastPage = true;
        }

        if (ok) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({search: query.search, results,lastPage,highestPage}));
        } else {
            next();
        }

    }
    else {
        next();
    }
}