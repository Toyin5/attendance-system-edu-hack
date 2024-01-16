import { randomInt } from 'crypto';

const generateRandomToken = () => {
  let randomNum = randomInt(0, 999999);
  while (randomNum < 100000) {
    randomNum = randomInt(0, 999999);
  }
  return randomNum.toString().padStart(6, '0');
};

export default generateRandomToken;
