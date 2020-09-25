function qs(name, value) {
    console.log(name, value);
    return value ? `&${name}=${value}` : ``;
}

export default function (search, exactMatch, caseSensitive) {
    return `/bible/search?search=${search}${qs('caseSensitive', caseSensitive)}${qs('exactMatch',exactMatch)}`;
}