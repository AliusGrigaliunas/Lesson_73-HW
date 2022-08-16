"use strict";
const formatLine = (text, indent = 0) => `${('\t').repeat(indent) + text}\n`;
class Person {
    id;
    name;
    surname;
    constructor(id, name, surname) {
        this.id = id;
        this.name = name;
        this.surname = surname;
    }
    getPersonInfo = () => `${this.name} ${this.surname} ${this.id}`;
}
class Employee extends Person {
}
class Job {
    title;
    pay;
    static instanceCount = 0;
    id;
    finished = false;
    payed = false;
    dateFinished;
    constructor(title, pay) {
        this.title = title;
        this.pay = pay;
        Job.instanceCount += 1;
        this.id = `Job-${Job.instanceCount}`;
        this.finished = false;
        this.payed = false;
    }
    completeJob = () => {
        this.finished = true;
        this.dateFinished = new Date();
    };
    setJobPayed = () => {
        this.payed = true;
    };
    getPay = () => this.pay;
    isFinished = () => this.finished;
    isPayed = () => this.payed;
    toString = () => {
        const { id, title, finished, pay, dateFinished, payed, } = this;
        return formatLine(`id: ${id}`, 2)
            + formatLine(`title: ${title}`, 2)
            + formatLine(`pay: ${pay}`, 2)
            + (finished ? formatLine(`finished: ${finished ? 'Yes' : 'No'}`, 2) : '')
            + (payed ? formatLine(`payed: ${payed ? 'Yes' : 'No'}`, 2) : '')
            + (dateFinished ? formatLine(`date finished: ${dateFinished.toLocaleDateString('lt-LT')}`, 2) : '');
    };
}
class BusinessLicencePerson extends Employee {
    jobs;
    constructor(name, surname, id, jobs) {
        super(id, name, surname);
        this.jobs = jobs;
    }
    calcPay() {
    }
    toString() {
        return formatLine(`${this.getPersonInfo()} ${this.jobs}`);
    }
}
class SelfEmployedPerson extends Employee {
    hourPay;
    hoursWorked;
    constructor(name, id, surname, hourPay, hoursWorked) {
        super(id, name, surname);
        this.hourPay = hourPay;
        this.hoursWorked = hoursWorked;
    }
    calcPay() {
        return this.hourPay * this.hoursWorked;
    }
    toString() {
        return formatLine(`${this.getPersonInfo()} ${this.hourPay} ${this.hoursWorked}`, 1);
    }
}
class WorkPerson extends Employee {
    hourPay;
    fullTimeEquivalent;
    constructor(name, surname, id, hourPay, fullTimeEquivalent) {
        super(id, name, surname);
        this.hourPay = hourPay;
        this.fullTimeEquivalent = fullTimeEquivalent;
    }
    calcPay() {
        return this.hourPay * ((this.fullTimeEquivalent / 5) * 40);
    }
    toString() {
        return `${this.getPersonInfo()} ${this.hourPay} ${this.fullTimeEquivalent}`;
    }
}
const job = [
    new Job('VideoEditor', 1500),
];
const employees = [
    new BusinessLicencePerson('4566849823168', 'Alius', 'Grigaliūnas', job),
    new SelfEmployedPerson('Gustas', '19875858585', 'Gustevičius', 5, 15),
    new WorkPerson('Juozas', 'Kestaits', '6846468489', 4, 30),
];
employees.forEach((employe) => console.log(employe.toString()));
employees.forEach((emp) => console.log(`${emp.calcPay()}\u20AC`));
//# sourceMappingURL=main.js.map