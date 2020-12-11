import template from "/util/template.js";


export default class Todo {
    constructor(todoObj) {
        this.title    = todoObj.title;
        this.singular = todoObj.singular;
        this.plural   = todoObj.plural;
        this.items    = todoObj.items;
        this.schedule = todoObj.schedule;
        this.id = todoObj.id;
    } 

    toJSON() {
        return {
            title: this.title,
            singular: this.singular,
            plural: this.plural,
            items: this.items,
            schedule: this.schedule
        }
    }

    completion(day) {
        let bools;
        if (this.schedule[day]) {
            bools = this.schedule[day]
                        .map((item) => this.items[item])
                        .map(item => item.completed);

            return bools.reduce((a,b) => (a + b), 0) / bools.length;
        }
        else {
            return 1;
        }
    }

    cellColor(day) {
        if (!this.schedule[day]) return "white";

        let past = new Date() > day;
        let avg = this.completion(day);

        if (avg === 1) {
            return "green-500";
        } else if (avg === 0) {
            if (past) {
                return "red-500";
            } else {
                return "white";
            }
        } else {
            if (past) {
                return "orange-500";
            } else {
                return "blue-500";
            }
        }
    }

    formatDay(day) {
        let indexes = this.schedule[day];
        if (indexes.length > 1) {
            return template(this.plural, {
                amount: indexes.length,
                start:  this.items[indexes[0]],
                end:    this.items[indexes[indexes.length-1]],
            });
        }
        else {
            return this.formatItem(indexes[0]);
        }
    }

    formatItem(index) {
        return template(this.singular, this.items[index]);
    }

    calcDays() {
        return Object.keys(this.schedule);
    }
}