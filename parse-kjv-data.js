const fs = require('fs');

function fileName(old) {
    old = old.toLowerCase()
    if (old.match(/^[1-3]/)) {
        return [old[0], old.substring(1)].join("-");
    }
    else if (old === "songofsolomon") {
        return "song-of-solomon";
    }
    else {
        return old;
    }
}

fs.readdir('./src/data/kjv', (err,data) => {
    data.forEach(item => {
        fs.rename(`./src/data/kjv/${item}`, `./src/data/kjv/${fileName(item.split('.json')[0])}.json`, (err)=>{console.log(err)});
    });
});