const mongoFunctions = require('../server/mongoController');

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
})

test('Check that an object is returned', () => {
  expect(typeof mongoFunctions.getNewQandA()).toBe('object');
});

