export default function (list) {
    let obj = {}
    for (let item of list) {
        obj[item[0]] = item[1]
    }
    
    return obj;
}