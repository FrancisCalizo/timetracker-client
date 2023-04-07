import { v4 as uuidv4 } from 'uuid';

export const FAKE_DATA = [
  {
    consultantId: uuidv4(),
    consultantName: 'Ryan Johnson',
    email: 'example@gmail.com',
    rate: 50,
  },
  {
    consultantId: uuidv4(),
    consultantName: 'Mike Jones',
    email: 'sample332@gmail.com',
    rate: 50,
  },
  {
    consultantId: uuidv4(),
    consultantName: 'John Randall',
    email: 'example111@gmail.com',
    rate: 50,
  },
];
