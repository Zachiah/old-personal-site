const regexMatcher = /\/(.+)\/([a-z]*)/

const regexMatcherFunc = function(fullRegexString) {
    const matchedRegexString = fullRegexString.match(regexMatcher);
    
    if (!matchedRegexString) {
        return null;
    }

    const regexString = `(${matchedRegexString[1]})`;
    const flags = matchedRegexString[2];

    let regex;
    try {
        return regex = new RegExp(regexString, flags);
    }
    catch {
        return null;
    }
}

export default regexMatcherFunc;