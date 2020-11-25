export default function(template, data) {
    return template.replace(
        /{(.*?)}/g,
        function(...args) {
            return getSpecial(data,args[1]);
        }
    );
}

function getSpecial(obj,key) {
    key = key.split(".");
    return key.length > 1 ? getSpecial(obj[key[0]],key.slice(1).join(".")) : obj[key[0]];
}