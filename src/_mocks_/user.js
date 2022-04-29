import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const users = [...Array(4)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: mockImgAvatar(index + 1),
  name: faker.name.findName(),
  company: faker.company.companyName(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer'
  ]),
  email: sample([
    'test@gmail.com',
    'test@gmail.com',
    'test@gmail.com',
    'test@gmail.com',
    'test@gmail.com',
    'test@gmail.com',
    'test@gmail.com',
    'test@gmail.com',
    'test@gmail.com',
    'test@gmail.com',
    'test@gmail.com',
    'test@gmail.com',
    'test@gmail.com',

  ])
}));

export default users;
