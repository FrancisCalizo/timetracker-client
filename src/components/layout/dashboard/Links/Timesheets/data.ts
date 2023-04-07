import { add, sub } from 'date-fns';

const someMonday = new Date('3-13-2023');
const anotherMonday = sub(someMonday, { days: 7 });
const andAnotherMonday = sub(anotherMonday, { days: 14 });

export const FAKE_DATA = [
  {
    id: '1',
    status: 'missing',
    client: 'Centrium Consulting',
    firstName: 'Ryan',
    lastName: 'Howard',
    isFixedRate: true,
    timesheets: [
      {
        date: someMonday,
        rate: 20,
        hours: 4,
        notes: null,
      },
      {
        date: add(someMonday, { days: 1 }),
        rate: 20,
        hours: 0,
        notes: null,
      },
      {
        date: add(someMonday, { days: 2 }),
        rate: 20,
        hours: 4,
        notes: null,
      },
      {
        date: add(someMonday, { days: 3 }),
        rate: 20,
        hours: 3,
        notes: null,
      },
      {
        date: add(someMonday, { days: 4 }),
        rate: 20,
        hours: 1.5,
        notes: null,
      },
      {
        date: add(someMonday, { days: 5 }),
        rate: 20,
        hours: 0,
        notes: null,
      },
      {
        date: add(someMonday, { days: 6 }),
        rate: 20,
        hours: 4,
        notes: null,
      },
    ],
  },
  {
    id: '2',
    status: 'approved',
    client: 'Perkins IT Group',
    firstName: 'Bob',
    lastName: 'Sanders',
    isFixedRate: false,
    timesheets: [
      {
        date: anotherMonday,
        rate: 50,
        hours: 4,
        notes: null,
      },
      {
        date: add(anotherMonday, { days: 1 }),
        rate: 50,
        hours: 0,
        notes: null,
      },
      {
        date: add(anotherMonday, { days: 2 }),
        rate: 50,
        hours: 4,
        notes: null,
      },
      {
        date: add(anotherMonday, { days: 3 }),
        rate: 70,
        hours: 3,
        notes: 'Extra pay for holiday',
      },
      {
        date: add(anotherMonday, { days: 4 }),
        rate: 0,
        hours: 0,
        notes: null,
      },
      {
        date: add(anotherMonday, { days: 5 }),
        rate: 50,
        hours: 0,
        notes: null,
      },
      {
        date: add(anotherMonday, { days: 6 }),
        rate: 0,
        hours: 0,
        notes: null,
      },
    ],
  },
  {
    id: '3',
    status: 'submitted',
    client: 'Pulte Homes',
    firstName: 'Morgan',
    lastName: 'Stanley',
    isFixedRate: true,
    timesheets: [
      {
        date: andAnotherMonday,
        rate: 100,
        hours: 4,
        notes: null,
      },
      {
        date: add(andAnotherMonday, { days: 1 }),
        rate: 100,
        hours: 1,
        notes: null,
      },
      {
        date: add(andAnotherMonday, { days: 2 }),
        rate: 100,
        hours: 4,
        notes: null,
      },
      {
        date: add(andAnotherMonday, { days: 3 }),
        rate: 100,
        hours: 3,
        notes: null,
      },
      {
        date: add(andAnotherMonday, { days: 4 }),
        rate: 100,
        hours: 2,
        notes: null,
      },
      {
        date: add(andAnotherMonday, { days: 5 }),
        rate: 100,
        hours: 5,
        notes: null,
      },
      {
        date: add(andAnotherMonday, { days: 6 }),
        rate: 100,
        hours: 4,
        notes: null,
      },
    ],
  },
];
