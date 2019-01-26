import * as moment from 'moment';
import { Merchant, Transaction } from '../modules/shared/models';
import { MCCCatalog } from './mcc_codes';
import { MERCHANTS } from './merchants';

export function generateTransactions(): Transaction[] {
  const transactions: Transaction[] = [...getSalaries(), ...getExpensiveTransactions(), ...getNormalTransactions()];
  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getExpensiveMerchants(): Merchant[] {
  const expensiveMerchants: Merchant[] = [];
  expensiveMerchants.push(Object.assign(new Merchant(), MERCHANTS.find(m => m.name === 'eMag')));
  expensiveMerchants.push(Object.assign(new Merchant(), MERCHANTS.find(m => m.name === 'evoMag')));
  expensiveMerchants.push(Object.assign(new Merchant(), MERCHANTS.find(m => m.name === 'IKEA')));
  expensiveMerchants.push(Object.assign(new Merchant(), MERCHANTS.find(m => m.name === 'ZARA')));
  return expensiveMerchants;
}

function getSalaries(): Transaction[] {
  const from = moment()
    .subtract(6, 'months')
    .date(5)
    .hours(12)
    .minutes(0)
    .seconds(0)
    .toDate();
  const to = moment()
    .date(5)
    .hours(12)
    .minutes(0)
    .seconds(0)
    .toDate();
  const salaries: Transaction[] = [];

  const employer = Object.assign(new Merchant(), MERCHANTS.find(m => m.name === 'Google'));
  for (const d = new Date(from); d <= to; d.setMonth(d.getMonth() + 1)) {
    // tslint:disable-next-line:max-line-length
    salaries.push(
      Object.assign(new Transaction(), {
        merchant: employer,
        amount: 9300,
        date: new Date(d),
        accountName: 'Main',
        category: 'Salary'
      })
    );
  }
  return salaries;
}

function getExpensiveTransactions(): Transaction[] {
  const from = moment()
    .subtract(6, 'months')
    .date(5)
    .hours(getRandomInt(12, 18))
    .minutes(0)
    .seconds(0);
  const to = moment()
    .date(5)
    .hours(getRandomInt(11, 19))
    .minutes(0)
    .seconds(0);
  const expensiveMerchants: Merchant[] = [...getExpensiveMerchants()];
  const transactions: Transaction[] = [];
  for (const d = from.toDate(); d <= to.toDate(); d.setMonth(d.getMonth() + 1)) {
    const merc = expensiveMerchants[getRandomInt(0, expensiveMerchants.length - 1)];
    const mcc = MCCCatalog.find(m => m.code === merc.code);
    transactions.push(
      Object.assign(new Transaction(), {
        merchant: merc,
        amount: -getRandomInt(600, 3000),
        date: new Date(d),
        accountName: 'Main',
        category: mcc.category
      })
    );
  }
  return transactions;
}

function getNormalTransactions(): Transaction[] {
  const from = moment()
    .subtract(6, 'months')
    .date(5)
    .hours(0)
    .minutes(0)
    .seconds(0);
  const to = moment()
    .date(5)
    .hours(0)
    .minutes(0)
    .seconds(0);
  // tslint:disable-next-line:max-line-length
  const normalMerchants: Merchant[] = MERCHANTS.filter(m => m.name !== 'IKEA' && m.name !== 'eMag' && m.name !== 'evoMag'
  ).map(m => Object.assign(new Merchant(), m));
  const transactions: Transaction[] = [];
  for (const d = from.toDate(); d <= to.toDate(); d.setDate(d.getDate() + getRandomInt(0, 2))) {
    const noOfTrans = getRandomInt(0, 3);
    for (let i = 0; i < noOfTrans; i++) {
      const merc = normalMerchants[getRandomInt(0, normalMerchants.length - 1)];
      const mcc = MCCCatalog.find(m => m.code === merc.code);
      const tDate = moment(d)
        .hours(getRandomInt(0, 23))
        .minutes(getRandomInt(0, 59))
        .seconds(getRandomInt(0, 59))
        .toDate();
      transactions.push(
        Object.assign(new Transaction(), {
          merchant: merc,
          amount: -getRandomInt(20, 400),
          date: tDate,
          accountName: 'Main',
          category: mcc.category
        })
      );
    }
  }
  return transactions;
}

generateTransactions();
