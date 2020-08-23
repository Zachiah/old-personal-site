import problems from "../../data/math-problems.js"

export function get(req,res,next) {
    const {id} = req.params;
    if (problems[id]) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({...problems[id], id: parseInt(id)}));
    }
    else {
        next();
    }
}