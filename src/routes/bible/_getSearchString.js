function qs(name, value) {
    console.log(name, value);
    return value ? `&${name}=${value}` : ``;
}

export default function (search, exactMatch, caseSensitive,wholeWords) {
    return `/bible/search?search=${search}${qs('caseSensitive', caseSensitive)}${qs('exactMatch',exactMatch)}${qs('wholeWords',wholeWords)}`;
}