import problems from "../../data/math-problems.js"

export function get(req,res,next) {
    res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(problems.map((item, index) => ({...item, id: index})).reverse()));
}