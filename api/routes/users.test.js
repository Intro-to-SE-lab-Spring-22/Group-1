let myFunction = require('./users');

describe("Calculator tests", () => {
    test('multiplying 2 * 4 should return 8', () => {
      expect(myFunction(2, 4)).toBe(8);
    });
   })