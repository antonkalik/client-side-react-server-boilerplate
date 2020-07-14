const spread = require('../spread');
const faker = require('faker');

const data = [9, 9, 9, 9, 8, 3, 0, 0, 0].map(minute => {
  return {
    message: faker.lorem
      .text()
      .slice(0, 9)
      .trim(),
    minute,
  };
});

describe('spreadSpec func test', () => {
  test('should join all 10 in array', () => {
    const result = spread(data);
    console.log('result:', result);
  });
});
