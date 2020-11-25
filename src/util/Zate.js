export const days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];

export const serializeDayNum = (num) => {
    if (num > 7) {
        return serializeDayNum(num - 7);
    } else if (num < 1) {
        return serializeDayNum(num + 7);
    } else {
        return num;
    }
}

export class Zate {
    constructor(time) {
        if (!time) {
            time = Date.now();
        }
        this.time = time;
        this.day = days[this.toDate().getDay()]; 
    }

    next(day) {
        if (days.indexOf(day) === -1) {
            throw new Error("Invalid day");
        }

        let amountToAdd = serializeDayNum(7 - (this.toDate().getDay() - days.indexOf(day)));
        
        let date = new Date(this.time);
        date.setDate(date.getDate() + amountToAdd);
        return new Zate(date.getTime());
    }

    toDate() {
        return new Date(this.time);
    }

    plusDays(amount) {
        let crapper = this.toDate();
        crapper.setDate(crapper.getDate() + amount)

        return new Zate(crapper.getTime());
    }

    minusDays(amount) {
        return this.plusDays(-amount);
    }
}