/* eslint-disable no-console */
/* eslint-disable max-classes-per-file */

const formatLine = (text: string, indent: number = 0): string => `${('\t').repeat(indent) + text}\n`;

abstract class Person {
  protected id!: string;

  protected name!: string;

  protected surname!: string;

  constructor(
    id: string,
    name: string,
    surname: string,
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
  }

  public getPersonInfo = ():string => `${this.name} ${this.surname} ${this.id}`;

  public abstract toString():string;
}

abstract class Employee extends Person {
  public abstract calcPay():number;
}

class Job {
  private static instanceCount = 0;

  private id!: string;

  private finished: boolean = false;

  private payed: boolean = false;

  private dateFinished?: Date;

  constructor(
    private title: string,
    private pay: number,
  ) {
    Job.instanceCount += 1;
    this.id = `Job-${Job.instanceCount}`;

    this.finished = false;
    this.payed = false;
  }

  public completeJob = (): void => {
    this.finished = true;
    this.dateFinished = new Date();
  };

  public setJobPayed = (): void => {
    this.payed = true;
  };

  public getPay = (): number => this.pay;

  public isFinished = (): boolean => this.finished;

  public isPayed = (): boolean => this.payed;

  public toString = (): string => {
    const {
      id,
      title,
      finished,
      pay,
      dateFinished,
      payed,
    } = this;

    return formatLine(`id: ${id}`, 2)
      + formatLine(`title: ${title}`, 2)
      + formatLine(`pay: ${pay}`, 2)
      + (finished ? formatLine(`finished: ${finished ? 'Yes' : 'No'}`, 2) : '')
      + (payed ? formatLine(`payed: ${payed ? 'Yes' : 'No'}`, 2) : '')
      + (dateFinished ? formatLine(`date finished: ${dateFinished.toLocaleDateString('lt-LT')}`, 2) : '');
  };
}

class BusinessLicencePerson extends Employee {
  private jobs!: Job[];

  constructor(name: string, surname: string, id: string, jobs: Job[]) {
    super(id, name, surname);
    this.jobs = jobs;
  }

  public calcPay(): number {

  }

  public override toString(): string {
    return formatLine(`${this.getPersonInfo()} ${this.jobs}`);
  }
}

class SelfEmployedPerson extends Employee {
  private hourPay!: number;

  private hoursWorked!: number;

  constructor(
    name:string,
    id:string,
    surname:string,
    hourPay:number,
    hoursWorked:number,
  ) {
    super(id, name, surname);
    this.hourPay = hourPay;
    this.hoursWorked = hoursWorked;
  }

  public calcPay(): number {
    return this.hourPay * this.hoursWorked;
  }

  public override toString(): string {
    return formatLine(`${this.getPersonInfo()} ${this.hourPay} ${this.hoursWorked}`, 1);
  }
}

class WorkPerson extends Employee {
  private hourPay!: number;

  private fullTimeEquivalent!: number;

  constructor(
    name:string,
    surname:string,
    id:string,
    hourPay:number,
    fullTimeEquivalent:number,
  ) {
    super(id, name, surname);
    this.hourPay = hourPay;
    this.fullTimeEquivalent = fullTimeEquivalent;
  }

  public calcPay(): number {
    return this.hourPay * ((this.fullTimeEquivalent / 5) * 40);
  }

  public override toString(): string {
    return `${this.getPersonInfo()} ${this.hourPay} ${this.fullTimeEquivalent}`;
  }
}

const job: Job[] = [
  new Job('VideoEditor', 1500),
];

const employees = [
  new BusinessLicencePerson('4566849823168', 'Alius', 'Grigaliūnas', job),
  new SelfEmployedPerson('Gustas', '19875858585', 'Gustevičius', 5, 15),
  new WorkPerson('Juozas', 'Kestaits', '6846468489', 4, 30),
];

employees.forEach((employe) => console.log(employe.toString()));
employees.forEach((emp) => console.log(`${emp.calcPay()}\u20AC`));
