type func = (min: number, max: number) => number;

const getRandomNumber: func = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default getRandomNumber;
